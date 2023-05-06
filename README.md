# todoApi

## Instalação

Instale as dependencias do _**NODE-JS (18)**_.
Crie um DB MYSQL com duas tabelas, a primeira chamada _tasks_ e a segunda _users_.

Set as config do DB igual o arquivo **.env.example**

## Tabela _tasks_

### id INT (com incrementação automática) | title varchar(150) | status varchar(150) | created_at varchar(45) | update_at varchar(45) | id_user INT

Todos as colunas são NOT NULL

## Tabela _users_

### id INT (com incrementação automática) | username varchar(50) | real_name varchar(250) | phone varchar(50) | email varchar(100) | user_password varchar(250) | token varchar(600)

Todas as colunas são NOT NULL

## Execução

No package.json, o script START está setado para executar _nodemon src/server.js_
