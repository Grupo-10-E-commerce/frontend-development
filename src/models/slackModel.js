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
    enviarNotificacao
};