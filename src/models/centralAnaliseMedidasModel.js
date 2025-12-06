var database = require("../database/config");

function buscarMedidas(id_empresa) {
    var instrucao = `
        SELECT COUNT(fraude) AS total_fraudes, 
        SUM(valor_transacao) AS prejuizo_total
        FROM compra
        WHERE fraude = 1 AND id_empresa = ${id_empresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarPorcentagem(id_empresa) {
    var instrucao = `
        SELECT 
            SUM(CASE WHEN fraude = 1 THEN 1 ELSE 0 END) AS total_fraudes,
            COUNT(*) AS total_vendas,
            ROUND(
                (SUM(CASE WHEN fraude = 1 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0)) * 100,
                2
            ) AS porcentagem_fraudes
        FROM compra
        WHERE id_empresa = ${id_empresa};
    `;
    console.log("Executando instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarTopCidades(id_empresa){
    var instrucao = `
        SELECT 
            cidade,
            SUM(CASE WHEN fraude = 1 THEN 1 ELSE 0 END) AS total_fraudes,
            COUNT(*) AS total_vendas,
            ROUND(
                (SUM(CASE WHEN fraude = 1 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0)) * 100,
                2
            ) AS taxa_fraudes
        FROM compra
        WHERE id_empresa = ${id_empresa}
        GROUP BY cidade
        HAVING total_vendas > 0
        ORDER BY taxa_fraudes DESC
        LIMIT 10;
    `;
    console.log("Executando instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarComprasFraudes(id_empresa){
    var instrucao = `
        SELECT 
            id_compra,
            DATE_FORMAT(data_hora_transacao, '%d/%m/%Y %H:%i') AS data_compra,
            valor_transacao,
            tipo_transacao,
            cidade
        FROM compra
        WHERE fraude = 1 
          AND id_empresa = ${id_empresa}
        ORDER BY data_hora_transacao DESC;
    `;
    console.log("Executando instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarAlertasSlack(id_empresa) {
    var instrucao = `
        SELECT 
            DATE_FORMAT(data_hora, '%d/%m/%Y %H:%i') AS data_alerta,
            acao,
            mensagem
        FROM slack_log
        WHERE id_empresa = ${id_empresa}
        ORDER BY data_hora DESC
        LIMIT 4;
    `;
    console.log("Executando instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarLogCron() {
    var instrucao = `
        SELECT 
            DATE_FORMAT(data_hora, '%d/%m/%Y %H:%i:%s') AS data_execucao,
            mensagem
        FROM log
        WHERE acao = 'CRON_EXECUCAO'
        ORDER BY data_hora DESC
        LIMIT 4;
    `;
    console.log("Executando instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarMedidas,
    buscarPorcentagem,
    buscarTopCidades,
    listarComprasFraudes,
    listarAlertasSlack,
    listarLogCron
}
