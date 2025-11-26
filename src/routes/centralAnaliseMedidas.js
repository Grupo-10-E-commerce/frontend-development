var express = require("express");
var router = express.Router();

var centralAnaliseMedidasController = require("../controllers/centralAnaliseMedidasController");

router.post("/buscarMedidas", function (req, res){
    centralAnaliseMedidasController.buscarMedidas(req, res);
});

module.exports = router;