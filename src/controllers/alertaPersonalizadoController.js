var alertaModel = require("../models/alertaPersonalizadoModel");

function cadastrar(req, res) {
    const {
        idEmpresa,
        idUsuario,
        nomeAlerta,
        metodoPagamento,
        valorMinimo,
        cidade,
        mes,
        ano,
        ativo,
    } = req.body;

    if(!idEmpresa || !idUsuario || !nomeAlerta) {
        return res.status(400).json({
            erro:"idEmpresa, idUsuario e nomeAlerta são obrigatorios"
        });
    }

    alertaModel.cadastrar(
        idEmpresa,
        idUsuario,
        nomeAlerta,
        metodoPagamento,
        valorMinimo,
        cidade,
        mes,
        ano,
        ativo
    ).then(() => {
        res.status(201).send();
    }).catch((erro) => {
        console.log("Erro ao cadastrar alerta personalizado:", erro);
        res.status(500).json({erro: "Erro ao tentar criar alerta"});
    });
}

function listarPorEmpresa(req, res) {
    const idEmpresa = req.params.idEmpresa;

    alertaModel.listarPorEmpresa(idEmpresa)
    .then((resultado) => {
        res.json(resultado);
    })
    .catch((erro) => {
        console.log("Erro ao listar alertas:", erro);
        res.status(500).json({erro: "Erro ao tentar listar os alertas"});
    });
}

function atualizar(req, res) {
    const idAlerta = req.params.idAlerta;

    const {
        idEmpresa,
        idUsuario,
        nomeAlerta,
        metodoPagamento,
        valorMinimo,
        cidade,
        mes,
        ano,
        ativo,
    } = req.body;

    if(!idEmpresa || !idUsuario || !nomeAlerta){
        return res.status(400).json({
            erro: "idEmpresa, idUsuario e nomeAlerta são obrigatórios"
        });
    }

    alertaModel.atualizar(
        idAlerta,
        idEmpresa,
        idUsuario,
        nomeAlerta,
        metodoPagamento,
        valorMinimo,
        cidade,
        mes,
        ano,
        ativo
    ).then(() => {
        res.status(204).send();
    }).catch((erro) => {
        console.log("Erro ao atualizar alerta personalizado.", erro);
        res.status(500).json({erro: "Erro ao tentar atualizar alerta"});
    })
}

module.exports = {
    cadastrar,
    listarPorEmpresa,
    atualizar
}