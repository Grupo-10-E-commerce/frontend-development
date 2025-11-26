var centralAnaliseMedidasModel = require("../models/centralAnaliseMedidasModel");

function buscarMedidas(req, res) {

    var id_empresa = req.body.id_empresa;

    centralAnaliseMedidasModel.buscarMedidas(id_empresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}


module.exports = {
    buscarMedidas
}