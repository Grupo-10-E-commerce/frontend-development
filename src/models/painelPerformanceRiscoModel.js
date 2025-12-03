var database = require("../database/config");

function buscarDados(id_empresa) {

    var instrucao = `
    select month(data_hora_transacao) as mes, count(*) as quantidade_fraudes 
    from compra
    where fraude = 1
    and year(data_hora_transacao) = ?
    group by month(data_hora_transacao)
    order by mes; `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

module.exports = {
    buscarDados
}