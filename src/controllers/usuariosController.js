var usuariosModel = require("../models/usuariosModel");

function login(req, res){

    var {email, senha} = req.body;

    if(!email || !senha){
        return res.status(400)("Email e senha são obrigatórios");
    }

    usuariosModel.efetuarLogin(email, senha).then(function (resultado){
        if(resultado .length == 1){
            res.status(200).json(resultado[0]);
        } else {
            res.status(500).send("Erro no login. Usuário não encontrado.")
        }
    })

    /*usuariosModel.efetuarLogin(email, senha).then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
    */
}

function cadastrar(req, res){
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    var email = req.body.email;
    var senha = req.body.senha;

    if(nome == undefined && sobrenome == undefined){
        res.status(400).send("Seu nome está undefined!");
    }


    usuariosModel.cadastrar(nome, sobrenome, email, senha).then(function(resposta){
        res.status(200).send("Usuário cadastrado com sucesso!");
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    login,
    cadastrar
}