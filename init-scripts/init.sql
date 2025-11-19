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
    slack_notificacoes_ativas TINYINT(1) NOT NULL DEFAULT 1,
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
    id_compra INT NOT NULL AUTO_INCREMENT,
    transacao_id VARCHAR(45),
    id_empresa INT NOT NULL,
    data_hora_transacao DATETIME NOT NULL,
    valor_transacao DECIMAL(10,2) NOT NULL, 
    tipo_transacao VARCHAR(45) NOT NULL,
    cidade VARCHAR(45),
    fraude TINYINT NOT NULL,
    PRIMARY KEY (id_compra)
);

CREATE TABLE IF NOT EXISTS alerta_fraude (
    id_alerta_fraude INT NOT NULL AUTO_INCREMENT,
    data_hora_alerta DATETIME NOT NULL,
    id_compra INT NOT NULL,
    PRIMARY KEY (id_alerta_fraude),
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
);

CREATE TABLE IF NOT EXISTS alerta_personalizado (
    id_alerta_personalizado INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    data_hora_transacao DATETIME NOT NULL,
    valor_transacao DECIMAL(10,2) NOT NULL,
    metodo_pagamento VARCHAR(45) NOT NULL,
    cidade VARCHAR(100),
    PRIMARY KEY (id_alerta_personalizado),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);