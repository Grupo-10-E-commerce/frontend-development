var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.body.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
    // res.json({
    //         id_empresa: resultado[0].id_empresa,
    //     });
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  console.log("Empresa buscar id constroller")
  let id = req.body.id_empresa;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function atualizar(req, res) {
  let id = req.body.id_empresa;
  let razao_social = req.body.razao_social;
  let cnpj = req.body.cnpj;

  empresaModel.atualizar(id, razao_social, cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function deletar(req, res) {
    let id_empresa = req.body.id_empresa;

    empresaModel.deletar(id_empresa).then(function (resposta) {
        res.status(200).send(resposta);
    }).catch(function (erro) {
        console.log("ERRO NO DELETAR:", erro);
        res.status(500).json(erro.sqlMessage || erro.message || erro);
    })
}
module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  atualizar,
  deletar
};
