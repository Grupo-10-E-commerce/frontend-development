var painelPerformanceRiscoModel = require("../models/painelPerformanceRiscoModel");

function buscarDados(req, res) {

    var id_empresa = req.body.id_empresa;

    painelPerformanceRiscoModel.buscarDados(id_empresa).then((resultado) => {
        res.status(200).json(resultado);
    });
    
}

module.exports = {
    buscarDados
}