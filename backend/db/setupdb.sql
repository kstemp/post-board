SET client_encoding TO 'UTF8';
--
CREATE DATABASE post_db ENCODING 'UTF8'	LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8' TEMPLATE template0;
--
\c post_db;
--
CREATE TABLE users
(
	login VARCHAR,
	PRIMARY KEY (login),

	email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL
);
--
CREATE TABLE communities (
	community_id SERIAL,
	PRIMARY KEY (community_id),
	
	name VARCHAR NOT NULL 
);
--
CREATE TABLE entities (
	entity_id SERIAL,
	PRIMARY KEY (entity_id)
);
--
CREATE TABLE posts (

	entity_id INTEGER UNIQUE NOT NULL REFERENCES entities (entity_id),
	PRIMARY KEY (entity_id),

	parent_community_id INTEGER REFERENCES communities (community_id), 

	created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),

	text VARCHAR NOT NULL,

	login VARCHAR REFERENCES users (login)

);

CREATE TABLE comments (

	entity_id INTEGER UNIQUE NOT NULL REFERENCES entities (entity_id),
	parent_post_id INTEGER NOT NULL REFERENCES posts (entity_id),

	PRIMARY KEY (entity_id),

	login VARCHAR REFERENCES users (login),

	text VARCHAR NOT NULL

);
--
CREATE TABLE reactions (

	reaction_id SERIAL,
	parent_entity_id INTEGER NOT NULL REFERENCES entities (entity_id),

	login VARCHAR NOT NULL REFERENCES users (login),

	PRIMARY KEY (parent_entity_id, login)

);


--

/*INSERT INTO persons (lastname,firstname) VALUES ('Smith', 'John') RETURNING id;





/*
	DEPRECATED - ONLY FOR REFERENCE
	auto-increment/decrement number of comments when a new one is created (one is removed) for a given post.
	This is so that we can always see the total number of comments without the need to fetch potentially
	large number of them.
*/
/*
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
/*
CREATE TRIGGER increment_comment_number AFTER INSERT ON comments FOR EACH ROW EXECUTE PROCEDURE increment_comment_number(); 
CREATE TRIGGER decrement_comment_number AFTER INSERT ON comments FOR EACH ROW EXECUTE PROCEDURE decrement_comment_number(); 
*/