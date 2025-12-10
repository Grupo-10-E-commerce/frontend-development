var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id_empresa = ${id}`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT id_empresa FROM empresa WHERE cnpj = '${cnpj}'`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);


  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);


  return database.executar(instrucaoSql);
}

function atualizar(id, razao_social, cnpj) {
    var instrucao = `
    UPDATE empresa 
    SET razao_social = '${razao_social}', cnpj = '${cnpj}'
    WHERE id_empresa = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(id_empresa) {
    var instrucao = `
    DELETE FROM empresa 
    WHERE id_empresa = ${id_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar, atualizar, deletar};
