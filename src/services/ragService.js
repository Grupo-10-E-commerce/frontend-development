const axios = require("axios")

async function consultarRag(pergunta, historico = []) {
    const url = "http://localhost:8000/rag";

    const response = await axios.post(url, {
        pergunta,
        historico
    });

    return response.data.resposta;
}

module.exports = { consultarRag };