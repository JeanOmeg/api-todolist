# todoApi

## Requisitos
**_NODE 18_** e o **_MySQL_** (recomendo usar o **_Docker_**)

## Instalação
Para instalar as dependencias do **_NODE_**, rode o **_yarn_** (recomendo) ou **_npm_**.

Crie um DB **_MYSQL_** com 3 tabelas, a primeira chamada **_tasks_**, a segunda **_users_** e a terceira **_tokens_**.
Remomendo usar o Docker pela simplicidade e praticidade.
Você pode rodar o comando abaixo para criar um container MySQL no Docker:

```
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root - p 3006:3006 -d mysql
```

Set as config do DB igual o arquivo **_.env.example_**, e você pode usar o arquivo ****create_table_template.sql**** (utils/sql) para criar as tabelas.

## Tabela **_tasks_**
```
CREATE TABLE tasks(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    created VARCHAR(255) NOT NULL,
    updated VARCHAR(255) NOT NULL,
    id_user INT NOT NULL
);
```

## Tabela **_users_**
```
CREATE TABLE users(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    real_name VARCHAR(255) NOT NULL,
    created VARCHAR(255) NOT NULL,
    updated VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    token VARCHAR(1000) NOT NULL
);
```

## Tabela **_tokens_**
```
...
```

## Testes unitarios
Existem alguns testes de exemplos na pasta **_tests_**

## Execução
No package.json, o script DEV está setado para executar **_nodemon src/server.js_**
