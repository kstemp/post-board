SET client_encoding
TO 'UTF8';
--
CREATE DATABASE post_db
ENCODING 'UTF8' 
	LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE template0;
--
\c post_db;
--
CREATE TABLE users
(
	login VARCHAR PRIMARY KEY,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,

	name VARCHAR
);
--
CREATE TABLE communities
(
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL
);
-- 
CREATE TABLE posts
(
	id SERIAL PRIMARY KEY,
	community_id INTEGER NOT NULL REFERENCES communities (id),
	text VARCHAR NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT NOW()
);
--
CREATE TABLE comments
(
	id SERIAL PRIMARY KEY,
	post_id INTEGER NOT NULL REFERENCES posts (id),
	text VARCHAR NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT NOW()
);

