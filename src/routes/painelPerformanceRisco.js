var express = require("express");
var router = express.Router();

var painelPerformanceRiscoController = require("../controllers/painelPerformanceRiscoController"); 

router.post("/buscarDados", function (req, res){
    painelPerformanceRiscoController.buscarDados(req, res);
});

module.exports = router;