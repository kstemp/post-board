SET client_encoding TO 'UTF8';
CREATE DATABASE post_db 
	ENCODING 'UTF8' 
	LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE template0;
\c post_db;
CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	text VARCHAR NOT NULL,
	date TIMESTAMP NOT NULL DEFAULT NOW()
);
