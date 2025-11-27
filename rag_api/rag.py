import os
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.embeddings import HuggingFaceEmbeddings


# CARREGA AS VARIAVEIS AMBIENTES DO .ENV

load_dotenv()


# PEGANDO AS VARIAVEIS AMBIENTE SETADAS NO .ENV PARA UTILIZA-LAS

MODEL = os.getenv('MODEL_NAME')
API_KEY = os.getenv('API_KEY')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PASTA = os.path.join(BASE_DIR, "docs")

os.environ["GOOGLE_API_KEY"] = API_KEY

# CRIANDO A VÁRIAVEL PARA GERAÇÃO DOS EMBEDDINGS E VÁRIAVEL PARA CHAMAR O MODELO PARA LLM

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

llm = ChatGoogleGenerativeAI(
    model=MODEL,   
    temperature=0.2
)


# CRIANDO O BANCO DE DADOS VETORIAL - CHROMADB

vector_store = Chroma (
    collection_name='chroma-database-01',
    embedding_function=embeddings,
    persist_directory='./rag_api/CHROMA-DB'
)


# LINKS DOS DOCUMENTOS

pdf_links = {
    "Documentacao.pdf": "https://bandteccom.sharepoint.com/:w:/r/sites/Grupo10Semestre2/_layouts/15/Doc.aspx?sourcedoc=%7B3571FA9E-4ABE-4F04-8156-258E3C42FA1E%7D&file=Documenta%C3%A7%C3%A3o.docx&action=default&mobileredirect=true",
    "Principais_Funcionalidades.pdf": "https://bandteccom-my.sharepoint.com/:w:/r/personal/gabriel_pietro_sptech_school/_layouts/15/Doc.aspx?sourcedoc=%7B34098267-EBEB-453A-904C-0C32CFC805CF%7D&file=Funcionalidades%20do%20Sistema.docx&action=default&mobileredirect=true&DefaultItemOpen=1&wdOrigin=MAIL.SHELL%2CAPPHOME-WEB.JUMPBACKIN&wdPreviousSession=a80e8fcc-89f0-4d92-ae6c-fc0677af669b&wdPreviousSessionSrc=AppHomeWeb&ct=1764274613622",
    "FAQ_Duvidas.pdf": "https://bandteccom-my.sharepoint.com/:w:/r/personal/gabriel_pietro_sptech_school/_layouts/15/Doc.aspx?sourcedoc=%7BBE3E5B2B-D8FC-4EB3-9483-E9287F5210AF%7D&file=Documento.docx&action=editnew&mobileredirect=true&wdPreviousSession=c04bdebe-2dd6-dc62-f4b0-eb660a23c3df&wdNewAndOpenCt=1764275167705&wdo=4&wdOrigin=wacFileNew&wdPreviousCorrelation=ff076fea-f001-40a2-8d4b-bdb5fb78222b&wdnd=1"
}


docs = [os.path.join(PASTA, arquivo) for arquivo in os.listdir(PASTA) if arquivo.endswith('.pdf')]

documents = []

for doc in docs:
    loader = PyPDFLoader(doc)
    loaded_docs = loader.load()

    # Nome do arquivo sem caminho
    filename = os.path.basename(doc)

    # Substitui o metadado "source" pelo link correspondente
    for d in loaded_docs:
        if filename in pdf_links:
            d.metadata["source"] = pdf_links[filename]

    documents.extend(loaded_docs)




# SPLITANDO/SEPARANDO OS DOCUMENTOS EM CHUNKS PARA MANDAR ESTES CHUNKS PARA O CHROMADB

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 1000,
    chunk_overlap = 500,
    add_start_index = True
)
all_splits = text_splitter.split_documents(documents)

documents_ids = vector_store.add_documents(documents = all_splits)


# INSTRUÇÃO PARA A LLM, TEMPLATE DE PROMPT PARA ELA SEGUIR, DE COMO ELA IRÁ RESPONDER A PERGUNTA DO USUÁRIO

template = PromptTemplate.from_template(
"""
Você é o Frabot 🤖, assistente da empresa Fraux.
Responda à pergunta do usuário com base no contexto abaixo.
Se não souber a resposta e a pergunta for algo mais técnico ou sério diga algo como 
'Desculpa, mas essa informação foge da minha base de conhecimentos!', 
já se for algo mais abrangente como 'Me fale uma receita de bolo' ou coisas do genero que não façam parte da Fraux pode responder em um tom
mais humorado como 'Ei ei ei! Isso não faz parte do meu ramo de trabalho! Eu respondo a dúvidas referentes a Fraux, tente outra pergunta' mas não todas de todas as respostas iguais, pode variar, seja engraçado e criativo.

Observação: Mande as respostas sem negrito ou formatações do tipo (mas pode colocar emogis se for interessante para a resposta)

Contexto:
{contexto}

Pergunta:
{pergunta}
"""
)




# FUNÇÃO DO RAG, RESPONSÁVEL POR REALIZAR A CONSULTA NO CHROMA DB E CONSTRUIR A RESPOSTA, TENDO COMO PARÂMETROS A PERGUNTA DO USUÁRIO 
# E O HISTÓRICO DE CONVERSA DO CHATBOT (DO USUÁRIO COM ELE), ONDE ESSA RESPOSTA É CONSTRUIDA COM BASE EM UMA BUSCA FILTRADA 
# POR RELEVANCE SCORE, ONDE ELE TEM QUE SER MAIOR OU IGUAL A 0.7 (LEMBRANDO QUE QUANTO MAIS PRÓXIMO DE 1, MAIS PRÓXIMA DA PERGUNTA A RESPOSTA FICA)

def rag(user_query: str, chat_history: list[dict]) -> str:
    history_text = ""

    for m in chat_history:
        role = "Usuário" if m["role"] == "user" else "Frabot"
        history_text += f"{role}: {m['content']}\n"

    context = vector_store.similarity_search_with_relevance_scores(user_query)
    context = list(filter(lambda x: x[1] >= 0.1, context))

    context_text = ""

    if not context:
        docs = vector_store.similarity_search(user_query, k=3)
        for d in docs:
            context_text += f"{d.page_content}\nFonte: {d.metadata.get('source','')}\n\n"

    for doc, score in context:
        context_text += f"{doc.page_content}\nFonte: {doc.metadata.get('source','')}\n\n"

    # Criação do prompt manualmente
    prompt_text = template.format(
        contexto=context_text,
        pergunta=user_query,
        hist_conversa=history_text
    )

    # Envio ao modelo Gemini
    response = llm.invoke(prompt_text)
    result_text = response.content

    return result_text

def run_rag_api(pergunta: str, historico: list[dict]) -> str:
    return rag(pergunta, historico)

run_rag_api("Quais funcionalidades o sistema possui?", [])