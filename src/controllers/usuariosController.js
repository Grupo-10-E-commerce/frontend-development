var usuariosModel = require("../models/usuariosModel");

function login(req, res) {

    var { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios");
    }

    usuariosModel.efetuarLogin(email, senha).then(function (resultado) {
        if (resultado.length == 1) {
            res.status(200).json(resultado[0]);
        } else if (resultado.length == 0) {
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

function cadastrar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var id_empresa = req.body.id_empresa;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }


    usuariosModel.cadastrar(nome, email, senha, id_empresa).then(function (resposta) {
        res.status(200).send("Usuário cadastrado com sucesso!");
    }).catch(function (erro) {
        console.log("ERRO NO CADASTRO:", erro);
        res.status(500).json(erro.sqlMessage || erro.message || erro);
    })
}

function atualizar(req, res) {
    var id_usuario = req.body.id_usuario;
    var nome = req.body.nome;
    var emailAtual = req.body.emailAtual;
    var email = req.body.email;
    var senhaAtual = req.body.senhaAtual;
    var novaSenha = req.body.novaSenha;

    if (senhaAtual == "" || novaSenha == "") {
        console.log("Senhas vazias")
        usuariosModel.atualizar(nome, email, id_usuario).then(function (resposta) {
            res.status(200).send("Usuário atualizado com sucesso!");
        }).catch(function (erro) {
            console.log("ERRO NO ATUALIZAR:", erro);
            res.status(500).json(erro.sqlMessage || erro.message || erro);
        })
    } else {
        console.log("Tentando alterar senha... " + emailAtual )

        usuariosModel.efetuarLogin(emailAtual, senhaAtual).then(function (resposta) {
            
            if (resposta.length == 1) {
                usuariosModel.atualizarSenha(nome, email, id_usuario, novaSenha).then(function (resposta) {
                    res.status(200).send("Usuário atualizado (com senha) com sucesso!");
                }).catch(function (erro) {
                    console.log("ERRO NO ATUALIZAR:", erro);
                    res.status(500).json(erro.sqlMessage || erro.message || erro);
                })

            } else if (resposta.length == 0) {
                res.status(401).send("Erro no login. Usuário não encontrado.")
            } else {
                res.status(500).send("erro no login. tem mais de um usuario")
            }
        })
    }
}

function buscarDados(req, res) {
    var id_usuario = req.body.id_usuario;

    usuariosModel.buscarDados(id_usuario).then(function (resposta) {
        res.status(200).send(resposta);
    }).catch(function (erro) {
        console.log("ERRO NO BUSCAR:", erro);
        res.status(500).json(erro.sqlMessage || erro.message || erro);
    })
}

function buscarTodosUsuarios(req, res) {
    let id_empresa = req.body.id_empresa;

    usuariosModel.buscarTodosUsuarios(id_empresa).then(function (resposta) {
        res.status(200).send(resposta);
    }).catch(function (erro) {
        console.log("ERRO NO BUSCAR:", erro);
        res.status(500).json(erro.sqlMessage || erro.message || erro);
    })
}

function deletar(req, res) {
    let id_usuario = req.body.id_usuario;

    usuariosModel.deletar(id_usuario).then(function (resposta) {
        res.status(200).send(resposta);
    }).catch(function (erro) {
        console.log("ERRO NO DELETAR:", erro);
        res.status(500).json(erro.sqlMessage || erro.message || erro);
    })
}
module.exports = {
    login,
    cadastrar,
    atualizar,
    buscarDados,
    buscarTodosUsuarios,
    deletar
}