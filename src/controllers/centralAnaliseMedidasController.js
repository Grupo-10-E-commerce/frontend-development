var centralAnaliseMedidasModel = require("../models/centralAnaliseMedidasModel");

function buscarMedidas(req, res) {

    var id_empresa = req.body.id_empresa;

    centralAnaliseMedidasModel.buscarMedidas(id_empresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorcentagem(req, res){
  var id_empresa = req.body.id_empresa;

  centralAnaliseMedidasModel.buscarPorcentagem(id_empresa)
    .then((resultado) =>{
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log("Erro ao buscar a porcentagem: ", erro);
      res.status(500).json(erro);
    })
}

function buscarTopCidades(req, res){
  var id_empresa = req.body.id_empresa;

  centralAnaliseMedidasModel.buscarTopCidades(id_empresa)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.log("Erro ao buscar cidades com mais fraudes", erro);
      res.status(500).json(erro);
    })
}

function listarComprasFraudes(req, res){
  var id_empresa = req.body.id_empresa;
  centralAnaliseMedidasModel.listarComprasFraudes(id_empresa)
  .then((resultado) =>{
    res.status(200).json(resultado);
  })
  .catch((erro) =>{
    console.log("Erro ao tentar listar compras fraudulentas", erro);
    res.status(500).json(erro);
  })
}

function listarAlertasSlack(req, res){
  var id_empresa = req.body.id_empresa;
  centralAnaliseMedidasModel.listarAlertasSlack(id_empresa)
  .then((resultado) => {
    res.status(200).json(resultado);
  })
  .catch((erro) => {
    console.log("Erro ao tentar listar alertas do slack", erro);
    res.status(500).json(erro);
  })
}

function listarLogCron(req, res) {
    var id_empresa = req.body.id_empresa;

    centralAnaliseMedidasModel.listarLogCron(id_empresa)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            console.log("Erro ao tentar listar log do cron", erro);
            res.status(500).json(erro);
        });
}


module.exports = {
    buscarMedidas,
    buscarPorcentagem,
    buscarTopCidades,
    listarComprasFraudes,
    listarAlertasSlack,
    listarLogCron
}