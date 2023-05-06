CREATE TABLE tasks(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    created VARCHAR(255) NOT NULL,
    updated VARCHAR(255) NOT NULL,
    id_user INT NOT NULL
);
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
