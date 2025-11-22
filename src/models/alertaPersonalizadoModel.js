var database = require("../database/config");

function cadastrar(idEmpresa, idUsuario, nomeAlerta, metodoPagamento, valorMinimo, cidade, mes, ano, ativo) {

    const metodoSql = metodoPagamento ? `'${metodoPagamento.replace("'", "''")}'` : "NULL";
    const valorMinSql = valorMinimo !== null && valorMinimo !== undefined ? valorMinimo : "NULL";
    const cidadeSql = cidade ? `'${cidade.replace("'", "''")}'` : "NULL";
    const mesSql = mes !== null && mes !== undefined ? mes : "NULL";
    const anoSql = ano !== null && ano !== undefined ? ano : "NULL";
    const ativoSql = ativo ? 1 : 0;

    var instrucao = `
        INSERT INTO alerta_personalizado (id_empresa, id_usuario, nome_alerta, metodo_pagamento, valor_minimo, cidade, mes, ano, ativo) VALUES (
            ${idEmpresa},
            ${idUsuario},
            '${nomeAlerta.replace("'", "''")}',
            ${metodoSql},
            ${valorMinSql},
            ${cidadeSql},
            ${mesSql},
            ${anoSql},
            ${ativoSql}
        );
    `;

    console.log("Executando SQL (cadastrar alerta):\n" + instrucao);
    return database.executar(instrucao);
}

function listarPorEmpresa(idEmpresa) {
    var instrucao = `
        SELECT id_alerta, nome_alerta, metodo_pagamento, valor_minimo, cidade, mes, ano, ativo FROM alerta_personalizado WHERE id_empresa = ${idEmpresa};
    `;

    console.log("Executando SQL (listar alertas):\n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listarPorEmpresa
};