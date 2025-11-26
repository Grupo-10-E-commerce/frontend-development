from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Literal, Optional
from rag_api.rag import run_rag_api
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Fraux RAG API",
    description="API para consulta ao RAG da Fraux",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Mensagem(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class RagRequest(BaseModel):
    pergunta: str
    historico: Optional[List[Mensagem]] = []

class RagResponse(BaseModel):
    resposta: str

@app.post("/rag", response_model=RagResponse)
async def consultar_rag(dados: RagRequest):
    pergunta = dados.pergunta
    historico = [m.dict() for m in dados.historico]

    resposta = run_rag_api(pergunta, historico)

    return RagResponse(resposta=resposta)