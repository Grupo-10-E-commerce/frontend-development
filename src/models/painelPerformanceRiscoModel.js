var database = require("../database/config");

function KPIlucroTotal(id_empresa, ano) {
    var instrucao = `select sum(valor_transacao) as lucros from compra
    where fraude = 0 and id_empresa = ?;`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);
}

function KPIperdaTotal(id_empresa, ano) {
    var instrucao = `select sum(valor_transacao) as perdas_totais from compra
    where fraude = 1 and id_empresa = ?`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);
}

function KPItotalFraudes(id_empresa, ano) {
    var instrucao = `select count(*) as total_fraudes
    from compra where fraude = 1 and id_empresa =?;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);
}

function qtdFraudes(id_empresa, ano) {
    var instrucao = `
    select month(data_hora_transacao) as mes, count(*) as quantidade_fraudes 
    from compra
    where fraude = 1
    and year(data_hora_transacao) = ?
    group by month(data_hora_transacao)
    order by mes; `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);

}

function cidadeFraude(id_empresa, ano) {
    var instrucao = `select cidade, count(*) as quantidade_fraudes
    from compra where fraude = 1 and id_empresa = ? 
    group by cidade order by quantidade_fraudes desc limit 5;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);
}

function atividadeVenda(id_empresa, ano, data) {
    var instrucao = `select hour(data_hora_transacao) as hora, count(*) as quantidade_vendas
    from compra where id_empresa = ? and year(data_hora_transacao) = ? and month(data_hora_transacao) = ?
    group by hour(data_hora_transacao) order by hora;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano, data]);
}

function lucrosTotais(id_empresa, ano) {
    var instrucao = `select year(data_hora_transacao) as ano, month(data_hora_transacao) as mes,
    sum(valor_transacao) as lucro_total from compra where year(data_hora_transacao) in (2023, 2024)
    and fraude = 0 and id_empresa = ? group by year(data_hora_transacao), month(data_hora_transacao) order by
    ano, mes;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);
}


module.exports = {
    KPIlucroTotal,
    KPIperdaTotal, 
    KPItotalFraudes, 
    qtdFraudes, 
    cidadeFraude, 
    atividadeVenda, 
    lucrosTotais
}