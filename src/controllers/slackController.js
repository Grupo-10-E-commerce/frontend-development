var slackModel = require("../models/slackModel");

function notificar(req, res) {
    var texto = req.body.text;

    if (!texto) {
        return res.status(400).json({ erro: "o campo text do body não pode ser vazio ou não foi recebido" });
    }

    slackModel.enviarNotificacao(texto)
        .then(() => {
            res.status(204).send();
        })
        .catch((erro) => {
            console.log("Erro ao enviar notificação para o Slack:", erro);
            res.status(500).json({ erro: "Falha ao enviar notificação" });
        });
}

function buscarStatus(req, res) {
    var idEmpresa = req.params.idEmpresa;

    slackModel.buscarStatus(idEmpresa)
        .then(function (resultado) {
            if (resultado.length === 0) {
                return res.json({ ativo: true });
            }

            var ativo = resultado[0].notificacoes_ativas == 1;
            res.json({ ativo: ativo });
        })
        .catch(function (erro) {
            console.log("Erro ao buscar status do slack:", erro);
            res.status(500).json({ erro: "erro ao buscar status" });
        });
}

function atualizarStatus(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var ativo = req.body.ativo;

    if (ativo == undefined) {
        return res.status(400).json({ erro: "Campo 'ativo' (true ou false) é obrigatório e não foi encontrado" });
    }

    const ativoNumero = ativo ? 1 : 0;

    slackModel.atualizarStatus(idEmpresa, ativoNumero)
        .then(function () {
            res.status(204).end();
        })
        .catch(function (erro) {
            console.log("Erro ao atualizar o status do slack", erro);
            res.status(500).json({ erro: "erro ao atualizar os status" });
        });
}

module.exports = {
    notificar,
    buscarStatus,
    atualizarStatus
};
