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
        const resultado = await painelPerformanceRiscoModel.cidadeFraude(id_empresa, ano);
        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ao buscar cidades com fraude:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados" });
    }
    
}

async function atividadeVenda(req, res) {

    var id_empresa = req.body.id_empresa;
    var ano = req.body.ano;
    var data = req.body.data;

    try {
        const resultado = await painelPerformanceRiscoModel.atividadeVenda(id_empresa, ano, data);
        res.status(200).json(resultado);
    } catch (erro) {
        console.error("Erro ao buscar atividade de vendas:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados" });
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

module.exports = {
    KPIlucroTotal, 
    KPIperdaTotal, 
    KPItotalFraudes, 
    qtdFraudes, 
    cidadeFraude, 
    atividadeVenda, 
    lucrosTotais
}