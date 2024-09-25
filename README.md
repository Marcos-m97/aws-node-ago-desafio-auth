# aws-node-ago-desafio-auth

CREATE DATABASE IF NOT EXISTS compasspb;

CREATE TABLE IF NOT EXISTS users (
id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID())
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255),
active TINYINT(1) DEFAULT 1
);

INSERT INTO users (name, email, password) 
VALUES ('Marcos', 'emailteste@teste.com', 'senha123'),
       ('Fabio', 'testemail@teste.com', 's3enh4'),
       ('Marcia', 'tesando@teste.com', 'Abc127845');

SELECT * FROM users;

SELECT id,name,email,password FROM users WHERE id = "1";

UPDATE users SET name = 'thor', email = 'email2teste@gmail.com',  password = '123senha' WHERE id = '1';
DELETE FROM users WHERE id = '1'