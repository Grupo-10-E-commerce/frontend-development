var database = require("../database/config");

function KPIlucroTotal(id_empresa, ano) {
    var instrucao = `select year(data_hora_transacao) as ano, sum(valor_transacao) as total
    from compra where fraude = 0 and id_empresa = ${id_empresa} 
    and year(data_hora_transacao) in (${ano}, ${ano} - 1)
    group by year (data_hora_transacao);`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);
}

function KPIperdaTotal(id_empresa, ano) {
    var instrucao = `select year(data_hora_transacao) as ano, sum(valor_transacao) as total
    from compra where fraude = 1 and id_empresa = ${id_empresa} 
    and year(data_hora_transacao) in (${ano}, ${ano} - 1)
    group by year (data_hora_transacao);`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);
}

function KPItotalFraudes(id_empresa, ano) {
    var instrucao = `select year(data_hora_transacao) as ano, count(*) as total_fraudes
    from compra where fraude = 1 and id_empresa = ${id_empresa} 
    and year(data_hora_transacao) in (${ano}, ${ano} - 1) group by year(data_hora_transacao);`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);
}

function qtdFraudes(id_empresa, ano) {
    var instrucao = `
    select month(data_hora_transacao) as mes, count(*) as quantidade_fraudes 
    from compra
    where fraude = 1
    and year(data_hora_transacao) = ${ano}
    group by month(data_hora_transacao)
    order by mes; `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);

}

function cidadeFraude(id_empresa, ano) {
    var instrucao = `select cidade, count(*) as quantidade_fraudes
    from compra where fraude = 1 and id_empresa = ${id_empresa} and year(data_hora_transacao) = ${ano}
    group by cidade order by quantidade_fraudes desc limit 5;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);
}

function atividadeVenda(id_empresa, ano, mes) {
    var instrucao = `select day(data_hora_transacao) as dia, count(*) as quantidade_vendas
    from compra where id_empresa = ${id_empresa} and year(data_hora_transacao) = ${ano}
    and month(data_hora_transacao) = ${mes} group by day(data_hora_transacao) order by dia;`

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano, mes]);
}

function lucrosTotais(id_empresa, ano) {
    var instrucao = `select year(data_hora_transacao) as ano, month(data_hora_transacao) as mes, 
    sum(valor_transacao) as lucro_total from compra where year(data_hora_transacao) in (${ano}, ${ano} - 1) 
    and fraude = 0 and id_empresa = ${id_empresa} group by year(data_hora_transacao), 
    month(data_hora_transacao) order by ano, mes;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao, [id_empresa, ano]);
}

function listarAnos(id_empresa) {
    var instrucao = ` select distinct year(data_hora_transacao) as ano from compra 
    where id_empresa = ${id_empresa} order by ano desc;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    KPIlucroTotal,
    KPIperdaTotal, 
    KPItotalFraudes, 
    qtdFraudes, 
    cidadeFraude, 
    atividadeVenda, 
    lucrosTotais,
    listarAnos
}