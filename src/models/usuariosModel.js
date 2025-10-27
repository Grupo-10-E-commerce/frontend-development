var database = require("../database/config")

function efetuarLogin(email, senha){
    var instrucao = `
    SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
console.log("Executando a instrução SQL: \n" + instrucao);
return database.executar(instrucao);

}

function cadastrar(nome, email, senha){
    var instrucao = `
    INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    efetuarLogin,
    cadastrar
}