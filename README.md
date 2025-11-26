# Fraux - Web

# Sobre o Projeto

Repositório destinado para postar os arquivos e códigos relacionados ao Projeto Fraux, contendo principalmente a parte relacionada aos CRUDs realizados, Dashboards dinâmicas, Slack e o Chatbot que possui nele

# Requisitos 🔨

Primeiro certifique-se que tenha o Python e Javascript instalado em sua máquina, após a verificar pode dar o seguinte comando (na pasta raiz do Projeto):

```
pip install -r requirements.txt
```

Este comando irá instalar todas as dependências Python do Projeto!

Também dê o comando:

```
npm i
```

Para instalar todas as dependências do Projeto.

# Como rodar o Projeto ? (Localmente) 💻

Primeiro suba a parte do Backend em Python com o comando:

```
uvicorn rag_api.main:app
```

E em seguida suba a Parte do Javascript (que também puxa o HTML/CSS):

```
npm start
```