var database = require("../database/config");

function efetuarLogin(email, senha) {
    var instrucao = `
    SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function cadastrar(nome, email, senha, id_empresa, id_cargo) {
    var instrucao = `
    INSERT INTO usuario (nome, email, senha, id_empresa, id_cargo) VALUES ('${nome}', '${email}', '${senha}', ${id_empresa}, ${id_cargo});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizar(nome, email, id_usuario, cargo) {
    var instrucao = `
    UPDATE usuario 
    SET nome = '${nome}', email = '${email}, id_cargo = ${cargo}
    WHERE id_usuario = ${id_usuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarSenha(nome, email, id_usuario, senha, cargo) {
    var instrucao = `
    UPDATE usuario 
    SET nome = '${nome}', email = '${email}', senha = '${senha}', id_cargo = ${cargo}
    WHERE id_usuario = ${id_usuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDados(id_usuario) {
    var instrucao = `
    SELECT nome, email, senha FROM usuario 
    WHERE id_usuario = '${id_usuario};'
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarTodosUsuarios(id_empresa) {
    var instrucao = `
    SELECT 
    U.id_usuario,
	u.nome AS usuario,
    u.email,
    u.senha,
    
    c.nome AS cargo
    FROM usuario u
    JOIN cargo c ON u.id_cargo = c.id_cargo
    
    WHERE u.id_empresa = ${id_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(id_usuario) {
    var instrucao = `
    DELETE FROM usuario WHERE id_usuario = ${id_usuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    efetuarLogin,
    cadastrar,
    atualizar,
    buscarDados,
    atualizarSenha,
    buscarTodosUsuarios,
    deletar
}