CREATE DATABASE IF NOT EXISTS Fraux;
USE Fraux;

CREATE TABLE IF NOT EXISTS cargo (
    id_cargo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    descricao VARCHAR(255),
    PRIMARY KEY (id_cargo)
);

INSERT INTO cargo (nome, descricao) 
SELECT 'administrador', 'Usuário que possui todas as funcionalidades do sistema liberadas.'
WHERE NOT EXISTS (SELECT * FROM cargo WHERE nome = 'administrador');

CREATE TABLE IF NOT EXISTS empresa (
    id_empresa INT NOT NULL AUTO_INCREMENT,
    razao_social VARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    PRIMARY KEY (id_empresa)
);

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL, 
    id_empresa INT NOT NULL,
    id_cargo INT NOT NULL,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa),
    FOREIGN KEY (id_cargo) REFERENCES cargo(id_cargo)
);

CREATE TABLE IF NOT EXISTS avaliacao (
    id_avaliacao INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nota INT NOT NULL,
    descricao VARCHAR(500),
    PRIMARY KEY (id_avaliacao),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS log (
    id_log INT NOT NULL AUTO_INCREMENT,
    id_compra_log INT NULL,
    data_hora DATETIME NOT NULL,
    acao VARCHAR(200),
    nivel_severidade VARCHAR(45),
    mensagem TEXT,
    PRIMARY KEY (id_log)
);

CREATE TABLE IF NOT EXISTS compra (
    id_compra INT NOT NULL,
    id_empresa INT NOT NULL,
    data_hora_transacao DATETIME NOT NULL,
    valor_transacao DECIMAL(10,2) NOT NULL, 
    tipo_transacao VARCHAR(45) NOT NULL,
    cidade VARCHAR(45),
    fraude TINYINT NOT NULL,
    PRIMARY KEY (id_compra),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE IF NOT EXISTS alerta_fraude (
    id_alerta_fraude INT NOT NULL AUTO_INCREMENT,
    data_hora_alerta DATETIME NOT NULL,
    id_compra INT NOT NULL,
    PRIMARY KEY (id_alerta_fraude),
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
);

CREATE TABLE IF NOT EXISTS alerta_personalizado (
    id_alerta INT NOT NULL AUTO_INCREMENT,
    id_empresa INT NOT NULL,
    id_usuario INT NOT NULL,
    nome_alerta VARCHAR(100) NOT NULL,
    metodo_pagamento VARCHAR(100) NULL,
    valor_minimo DECIMAL(10,2) NULL,
    cidade VARCHAR(100) NULL,
    mes INT NULL,
    ano INT NULL,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (id_alerta),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS slack_config (
    id_slack_config INT NOT NULL AUTO_INCREMENT,
    id_empresa INT NOT NULL,
    notificacoes_ativas TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (id_slack_config),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa),
    UNIQUE (id_empresa)
);

CREATE TABLE IF NOT EXISTS slack_log (
    id_slack_log INT NOT NULL AUTO_INCREMENT,
    id_empresa INT NOT NULL,
    data_hora DATETIME NOT NULL,
    acao VARCHAR(100) NOT NULL,
    nivel VARCHAR(20) NOT NULL,
    mensagem TEXT NOT NULL,
    PRIMARY KEY (id_slack_log),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);
