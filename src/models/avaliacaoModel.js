var database = require("../database/config");

function verificarAvaliacao(idUsuario) {
    var instrucao = `select id_avaliacao, timestampdiff(hour, data_avaliacao, now())
    as horas_passadas from avaliacao where id_usuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nota, descricao, idUsuario) {
    var instrucao = `insert into avaliacao(nota, descricao, id_Usuario, data_avaliacao)
    values (${nota}, '${descricao}', ${idUsuario}, now());`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function editar(nota, descricao, idUsuario) {
    var instrucao = `update avaliacao set nota = ${nota}, descricao = '${descricao}', 
    data_avaliacao = now() where id_usuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluir(idUsuario) {
    var instrucao = `delete from avaliacao where id_usuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMelhores() {
    var instrucao = `select a.descricao, u.nome, c.nome as cargo, e.razao_social as empresa
    from avaliacao a join usuario u on a.id_usuario = u.id_usuario join cargo c on u.id_cargo = c.id_cargo
    join empresa e on u.id_empresa = e.id_empresa where a.nota = 5 order by a.data_avaliacao desc limit 10;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    verificarAvaliacao,
    cadastrar,
    editar,
    excluir,
    listarMelhores
};