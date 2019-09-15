SET client_encoding TO 'UTF8';
--
CREATE DATABASE post_db ENCODING 'UTF8'	LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8' TEMPLATE template0;
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
	created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
	login VARCHAR,

	auto_comment_count INTEGER DEFAULT 0
);
--
CREATE TABLE comments
(
	id SERIAL PRIMARY KEY,
	post_id INTEGER NOT NULL REFERENCES posts (id),
	text VARCHAR NOT NULL,
	created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
	login VARCHAR
);
/*
	auto-increment/decrement number of comments when a new one is created (one is removed) for a given post.
	This is so that we can always see the total number of comments without the need to fetch potentially
	large number of them.
*/
CREATE OR REPLACE FUNCTION increment_comment_number() 
RETURNS TRIGGER AS $$
BEGIN
	UPDATE posts SET auto_comment_count = auto_comment_count + 1 WHERE id = NEW.post_id;
	RETURN NEW;	
END;
$$ LANGUAGE plpgsql VOLATILE;

CREATE OR REPLACE FUNCTION decrement_comment_number() 
RETURNS TRIGGER AS $$
BEGIN
	UPDATE posts SET auto_comment_count = auto_comment_count - 1 WHERE id = OLD.post_id;
	RETURN OLD;	
END;
$$ LANGUAGE plpgsql VOLATILE;

-- TODO rename to increment_comment_count, etc.
-- TODO for each row?
CREATE TRIGGER increment_comment_number AFTER INSERT ON comments FOR EACH ROW EXECUTE PROCEDURE increment_comment_number(); 
CREATE TRIGGER decrement_comment_number AFTER INSERT ON comments FOR EACH ROW EXECUTE PROCEDURE decrement_comment_number(); 