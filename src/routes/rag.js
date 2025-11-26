var express = require("express");
var router = express.Router();
var { consultarRag } = require("../services/ragService");

router.post("/consultar", async (req, res) => {
    try {
        const { pergunta, historico } = req.body;

        const resposta = await consultarRag(pergunta, historico);

        res.json({
            pergunta,
            resposta,
        });
    } catch (erro) {
        console.error("Erro ao consultar RAG para Chatbot: ", erro);
        res.status(500).json({ erro: "Erro interno ao consultar RAG para Chatbot"})
    }
})

module.exports = router; 