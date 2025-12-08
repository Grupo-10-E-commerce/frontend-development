var express = require("express");
var router = express.Router();
var avaliacaoController = require("../controllers/avaliacaoController");

router.post("/salvar", function(req, res) {
    avaliacaoController.salvar(req, res);
});

router.delete("/excluir/:idUsuario", function(req, res) {
    avaliacaoController.excluir(req, res);
});

router.post("/listarMelhores", function(req, res) {
    avaliacaoController.listarMelhores(req, res);
});

module.exports = router;