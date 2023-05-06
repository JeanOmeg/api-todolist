# todoApi
Essa API é responsavel pelo backend do projeto **_quasarCrud_**

## Requisitos
**_NODE 18_** e o **_MySQL_** (recomendo usar o **_Docker_**)

## Instalação
Para instalar as dependencias do **_NODE_**, rode o **_yarn_** (recomendo) ou **_npm_**.
Algumas extenxões do **_VScode_** podem facilitar o desenvolvimento, como a **_ThunderCLient_** (para requisições de teste), o **_banco de dados_** e o **_Docker_** para facilitar a gestão do banco.

Crie um DB **_MYSQL_** com 3 tabelas, a primeira chamada **_tasks_**, a segunda **_users_** e a terceira **_tokens_**.
Remomendo usar o **_Docker_** pela simplicidade e praticidade.
Você pode rodar o comando abaixo para criar um container **_MySQL_** no **_Docker_**:

```
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root - p 3006:3006 -d mysql
```

Set as config do DB igual o arquivo **_.env.example_**, e você pode usar o arquivo **create_table_template.sql** (utils/sql) para criar as tabelas.

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
    token VARCHAR(1000) NOT NULL,
    admin VARCHAR(50) NOT NULL,
    online VARCHAR(50) NOT NULL
);
```

## Tabela **_tokens_**
```
CREATE TABLE tokens(
    token VARCHAR(1000) NOT NULL,
    created VARCHAR(255) NOT NULL,
    id_user INT NOT NULL
);
```

## Execução
No arquivo **_package.json_**, o script **_dev_** está setado para executar **_nodemon src/server.js_**, execute o comando:
```
yarn dev
```
## Testes unitarios
Existem alguns testes de exemplos na pasta **_tests_**, para rodar os testes execute o comando:
```
yarn test
```