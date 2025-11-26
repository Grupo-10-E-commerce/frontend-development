var database = require("../database/config");

function buscarMedidas(id_empresa) {
    var instrucao = `
    SELECT COUNT(fraude) AS total_fraudes FROM compra
	WHERE fraude = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarMedidas
}