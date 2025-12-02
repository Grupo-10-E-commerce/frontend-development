var express = require("express");
var router = express.Router();

var painelPerformanceRiscoController = require("../controllers/painelPerformanceRiscoController"); 

router.post("/KPIlucroTotal", function (req, res){
    painelPerformanceRiscoController.KPIlucroTotal(req, res);
});

router.post("/KPIperdaTotal", function (req, res){
    painelPerformanceRiscoController.KPIperdaTotal(req, res);
});

router.post("/KPItotalFraudes", function (req, res){
    painelPerformanceRiscoController.KPItotalFraudes(req, res);
});

router.post("/qtdFraudes", function (req, res){
    painelPerformanceRiscoController.qtdFraudes(req, res);
});

router.post("/cidadeFraude", function (req, res){
    painelPerformanceRiscoController.cidadeFraude(req, res);
});

router.post("/atividadeVenda", function (req, res){
    painelPerformanceRiscoController.atividadeVenda(req, res);
});

router.post("/lucrosTotais", function (req, res){
    painelPerformanceRiscoController.lucrosTotais(req, res);
});

module.exports = router;