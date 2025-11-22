var usuariosModel = require("../models/usuariosModel");

function login(req, res){

    var {email, senha} = req.body;

    if(!email || !senha){
        return res.status(400).send("Email e senha são obrigatórios");
    }

    usuariosModel.efetuarLogin(email, senha).then(function (resultado){
        if(resultado.length == 1){
            res.status(200).json(resultado[0]);
        } else if(resultado.length == 0) {
            res.status(401).send("Erro no login. Usuário não encontrado.")
        } else {
            res.status(500).send("erro no login. tem mais de um usuario")
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
    var email = req.body.email;
    var senha = req.body.senha;
    var id_empresa = req.body.id_empresa;

    if(nome == undefined){
        res.status(400).send("Seu nome está undefined!");
    }


    usuariosModel.cadastrar(nome, email, senha, id_empresa).then(function(resposta){
        res.status(200).send("Usuário cadastrado com sucesso!");
    }).catch(function(erro){
        console.log("ERRO NO CADASTRO:", erro);
        res.status(500).json(erro.sqlMessage || erro.message || erro);
    })
}

module.exports = {
    login,
    cadastrar
}