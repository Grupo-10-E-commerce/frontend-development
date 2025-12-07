var database = require("../database/config");

function verificarAvaliacao(idUsuario) {
    var instrucao = `select id_avaliacao, timestampdiff(hour, data_avaliacao, now())
    as horas_passadas from avaliacao where id_usuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nota, descricao, idUsuario) {
    var instrucao = `insert into avaliacao(nota, descricao, data_avaliacao)
    values (${nota}, ${descricao}, ${idUsuario}, now());`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(nota, descricao, idUsuario) {
    var instrucao = `update avaliacao set nota = ${nota}, descricao = ${descricao}, 
    data_avaliacao = now() where id_usuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluir(idUsuario) {
    var instrucao = `delete from avaliacao where id_usuario = ${idUsuario};`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    verificarAvaliacao,
    cadastrar,
    editar,
    excluir
};