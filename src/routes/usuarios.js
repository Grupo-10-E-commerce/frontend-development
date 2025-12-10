var express = require("express");
var router = express.Router();

var usuariosController = require("../controllers/usuariosController");

router.post("/cadastrar", function (req, res){
    usuariosController.cadastrar(req, res);
});

router.post("/login", function (req, res){
    usuariosController.login(req, res);
});

router.post("/atualizar", function (req, res){
    usuariosController.atualizar(req, res);
});

router.post("/buscarDados", function (req, res){
    usuariosController.buscarDados(req, res);
});

router.post("/buscarTodosUsuarios", function (req, res){
    usuariosController.buscarTodosUsuarios(req, res);
});

router.post("/deletar", function (req, res){
    usuariosController.deletar(req, res);
});
module.exports = router;