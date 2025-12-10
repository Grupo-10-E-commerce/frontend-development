var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.post("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.post("/buscarId", function (req, res) {
  empresaController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

router.post("/atualizar", function (req, res) {
  empresaController.atualizar(req, res);
});

router.post("/deletar", function (req, res) {
  empresaController.deletar(req, res);
});

module.exports = router;