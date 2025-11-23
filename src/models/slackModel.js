var database = require("../database/config");

function atualizarStatus(idEmpresa, ativo) {

    var instrucao = `
    INSERT INTO slack_config (id_empresa, notificacoes_ativas) VALUES (${idEmpresa}, ${ativo}) ON DUPLICATE KEY UPDATE notificacoes_ativas = ${ativo};
    `;

    console.log("Executando SQL (atualizarStatus):\n" + instrucao);
    return database.executar(instrucao);
}

function buscarStatus(idEmpresa) {
    var instrucao = `
        SELECT notificacoes_ativas FROM slack_config WHERE id_empresa = ${idEmpresa};
    `;

    console.log("Executando SQL (buscarStatus):\n" + instrucao);
    return database.executar(instrucao);
}

function enviarNotificacao(texto) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
        return Promise.reject("SLACK_WEBHOOK_URL não configurada no .env.dev");
    }

    return fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: texto })
    }).then(async (resposta) => {
        if (!resposta.ok) {
            const corpo = await resposta.text();
            throw new Error(
                `Erro do Slack (status ${resposta.status}): ${corpo}`
            );
        }
    });
}

module.exports = {
    atualizarStatus,
    buscarStatus,
    enviarNotificacao
};