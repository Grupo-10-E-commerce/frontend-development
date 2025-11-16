var express = require("express");
var router = express.Router();

var slackController = require("../controllers/slackController");

router.post("/notificar", function (req,res) {
    slackController.notificar(req, res);
});

module.exports = router;