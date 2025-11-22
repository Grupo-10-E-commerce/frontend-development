var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaPersonalizadoController");

router.post("/", function (req, res) {
    alertaController.cadastrar(req, res);
});

router.get("/empresa/:idEmpresa", function (req, res){
    alertaController.listarPorEmpresa(req, res);
});

router.post("/atualizar/:idAlerta", function (req, res) {
    alertaController.atualizar(req, res);
});

module.exports = router;