var slackModel = require("../models/slackModel");

function notificar(req, res) {
    var texto = req.body.text;

    if(!texto) {
        return res.status(400).json({ erro: "o campo text do body não pode ser vazio ou não foi recebido"});
    }

    slackModel.enviarNotificacao(texto)
        .then(() => {
            res.status(204).end();
        })
        .catch((erro) => {
            console.log("Erro ao enviar notificação para o Slack:", erro);
            res.status(500).json({erro: "Falha ao enviar notificação"});
        }
    );
}

module.exports = {
    notificar
}