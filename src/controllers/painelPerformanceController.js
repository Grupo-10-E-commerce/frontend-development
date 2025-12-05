var painelPerformanceRiscoModel = require("../models/painelPerformanceRiscoModel");

async function KPIlucroTotal(req, res) {

    var id_empresa = req.body.id_empresa;
    var ano = req.body.ano;

    try {
        const resultado = await painelPerformanceRiscoModel.KPIlucroTotal(id_empresa, ano);
        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ao buscar lucro total:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados" });
    }
    
}

async function KPIperdaTotal(req, res) {

    var id_empresa = req.body.id_empresa;
    var ano = req.body.ano;

    try {
        const resultado = await painelPerformanceRiscoModel.KPIperdaTotal(id_empresa, ano);
        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ao buscar perda total:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados" });
    }
    
}

async function KPItotalFraudes(req, res) {

    var id_empresa = req.body.id_empresa;
    var ano = req.body.ano;

    try {
        const resultado = await painelPerformanceRiscoModel.KPItotalFraudes(id_empresa, ano);
        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ao buscar total de fraudes:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados" });
    }
    
}

async function qtdFraudes(req, res) {

    var id_empresa = req.body.id_empresa;
    var ano = req.body.ano;

   try {
        const resultado = await painelPerformanceRiscoModel.qtdFraudes(id_empresa, ano);
        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ao buscar quantidade de fraudes:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados" });
    }
    
}

async function cidadeFraude(req, res) {

    var id_empresa = req.body.id_empresa;
    var ano = req.body.ano;

    try {
        const resposta = await painelPerformanceRiscoModel.cidadeFraude(id_empresa, ano);
        res.status(200).json(resposta);
    } catch (erro) {
        console.error("Erro ao buscar cidades com fraude:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados" });
    }
    
}

async function atividadeVenda(req, res) {
    var id_empresa = req.body.id_empresa;
    var ano = req.body.ano;
    var mes = req.body.mes;

    if (id_empresa == undefined) {
        return res.status(400).send("Seu id_empresa está undefined!");
    }
    if (ano == undefined) {
        return res.status(400).send("Seu ano está undefined!");
    }

    try {
        const resultado = await painelPerformanceRiscoModel.atividadeVenda(id_empresa, ano, mes);

        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);

        if (resultado.length > 0) {
            return res.status(200).json(resultado);
        } else {
            return res.status(204).send("Nenhum resultado encontrado!");
        }
    } catch (erro) {
        console.log(erro);
        console.log("Erro ao realizar a busca! Erro: ", erro.sqlMessage);
        return res.status(500).json(erro.sqlMessage);
    }
}

async function lucrosTotais(req, res) {

    var id_empresa = req.body.id_empresa;
    var ano = req.body.ano;

    try {
        const resultado = await painelPerformanceRiscoModel.lucrosTotais(id_empresa, ano);
        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ao buscar lucros totais:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados" });
    }
}

async function listarAnos(req, res) {
    var id_empresa = req.body.id_empresa;

    if (id_empresa == undefined) {
        return res.status(400).send("id_empresa undefined!");
    }

    try {
        const resultado = await painelPerformanceRiscoModel.listarAnos(id_empresa);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum ano encontrado!");
        }
    } catch (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    }
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