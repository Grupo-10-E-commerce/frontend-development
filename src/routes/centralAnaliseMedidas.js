var express = require("express");
var router = express.Router();

var centralAnaliseMedidasController = require("../controllers/centralAnaliseMedidasController");

router.post("/buscarMedidas", function (req, res){
    centralAnaliseMedidasController.buscarMedidas(req, res);
});

router.post("/buscarPorcentagem", function(req, res) {
    centralAnaliseMedidasController.buscarPorcentagem(req, res);
})

router.post("/buscarTopCidades", function(req, res){
    centralAnaliseMedidasController.buscarTopCidades(req, res);
})

router.post("/listarComprasFraudes", function(req, res){
    centralAnaliseMedidasController.listarComprasFraudes(req, res);
})

router.post("/listarAlertasSlack", function (req, res) {
    centralAnaliseMedidasController.listarAlertasSlack(req, res);
});

router.post("/listarLogCron", function (req, res) {
    centralAnaliseMedidasController.listarLogCron(req, res);
});

module.exports = router;