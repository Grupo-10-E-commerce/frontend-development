var avaliacaoModel = require("../models/avaliacaoModel");

function salvar(req, res) {
    var nota = req.body.nota;
    var descricao = req.body.descricao;
    var idUsuario = req.body.idUsuario;

    if (nota == undefined || idUsuario == undefined) {
        return res.status(400).send("Dados incompletos!");
    }

    avaliacaoModel.verificarAvaliacao(idUsuario)
        .then(function (resultado) {

            if(resultado.length == 0) {
                avaliacaoModel.cadastrar(nota, descricao, idUsuario)
                .then(resCadastro => res.json(resCadastro));
            } else {
                var hora = resultado[0].horas_passadas;

                if(hora < 24) {
                    avaliacaoModel.editar(nota, descricao, idUsuario)
                    .then(resEdicao => res.json(resEdicao));
                } else {
                    res.status(403).send("O tempo de edição (24h) expirou. Você só pode excluir esta avaliação.");
                }
            }
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function excluir(req, res) {
    var idUsuario = req.params.idUsuario;

    avaliacaoModel.excluir(idUsuario)
    .then(resultado => res.json(resultado))
    .catch(erro => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarMelhores(req, res) {
    avaliacaoModel.listarMelhores()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Erro ao buscar os relatos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    salvar,
    excluir,
    listarMelhores
}