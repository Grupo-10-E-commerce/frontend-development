var express = require("express");
var router = express.Router();
var avaliacaoController = require("../controllers/avaliacaoController");

router.post("/salvar", function(req, res) {
    avaliacaoController.salvar(req, res);
});

router.post("/excluir", function(req, res) {
    avaliacaoController.excluir(req, res);
});

module.exports = router;