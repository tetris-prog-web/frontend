CREATE SCHEMA `tetris_grupo_02`;
USE tetris_grupo_02;

CREATE TABLE player (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    phone VARCHAR(11) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE ranking (
    id INT NOT NULL AUTO_INCREMENT,
    player_id INT NOT NULL,
    score INT NOT NULL,
    level INT NOT NULL,
    duration TIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (player_id) REFERENCES player(id)
);
