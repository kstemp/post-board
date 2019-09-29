SET client_encoding TO 'UTF8';

CREATE DATABASE post_db ENCODING 'UTF8'	LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8' TEMPLATE template0;

\c post_db;

CREATE TABLE users (
	user_id SERIAL,
	PRIMARY KEY (user_id),

	email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL
);

CREATE TABLE nonactive_users (

	email VARCHAR,
	password VARCHAR NOT NULL,
	email_hash VARCHAR,

	PRIMARY KEY (email, email_hash)

);

CREATE TABLE communities (
	community_id SERIAL,
	PRIMARY KEY (community_id),
	
	name VARCHAR NOT NULL 
);

-- 
CREATE TYPE type_role AS ENUM ('admin');

CREATE TABLE user_roles (

	community_id INTEGER NOT NULL REFERENCES communities (community_id),
	user_id INTEGER NOT NULL REFERENCES users (user_id),

	PRIMARY KEY (community_id, user_id),

	role type_role NOT NULL DEFAULT 'admin'

);

/*
*/
CREATE TABLE entities (
	entity_id SERIAL,
	PRIMARY KEY (entity_id)
);

/*
CREATE TABLE text_entities (

	created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),

	text VARCHAR NOT NULL,

	comment_count INTEGER NOT NULL DEFAULT 0,
	reaction_count INTEGER NOT NULL DEFAULT 0

);*/
--
-- TODO inherit posts and comments from some TextEntity which has login, created_on and tetx as fields
CREATE TABLE posts (

	entity_id INTEGER UNIQUE NOT NULL REFERENCES entities (entity_id) ON DELETE CASCADE,
	PRIMARY KEY (entity_id),

	parent_community_id INTEGER REFERENCES communities (community_id), 

	user_id INTEGER REFERENCES users (user_id),

	created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),

	text VARCHAR NOT NULL,

	comment_count INTEGER NOT NULL DEFAULT 0,
	reaction_count INTEGER NOT NULL DEFAULT 0

);

CREATE TABLE comments (

	entity_id INTEGER UNIQUE NOT NULL REFERENCES entities (entity_id),
	PRIMARY KEY (entity_id),

	parent_post_id INTEGER NOT NULL REFERENCES posts (entity_id),
	parent_comment_id INTEGER REFERENCES comments (entity_id),

	user_id INTEGER REFERENCES users (user_id),

	created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),

	text VARCHAR NOT NULL,

	comment_count INTEGER NOT NULL DEFAULT 0,
	reaction_count INTEGER NOT NULL DEFAULT 0

);
--
CREATE TABLE reactions (

	reaction_id SERIAL,
	parent_entity_id INTEGER NOT NULL REFERENCES entities (entity_id),

	user_id INTEGER NOT NULL REFERENCES users (user_id),

	PRIMARY KEY (parent_entity_id, user_id)

);

CREATE OR REPLACE FUNCTION get_post_by_id(_entity_id INTEGER) RETURNS SETOF posts AS 
$$
BEGIN
	RETURN QUERY (SELECT * FROM posts WHERE posts.entity_id = _entity_id);
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_post(_parent_community_id INTEGER, _text VARCHAR, _user_id INTEGER DEFAULT NULL) RETURNS VOID AS 
$$
DECLARE
	new_entity_id INTEGER;
BEGIN
	INSERT INTO entities (entity_id) VALUES (DEFAULT) RETURNING entity_id INTO new_entity_id;
	INSERT INTO posts (entity_id, parent_community_id, text, user_id) VALUES (new_entity_id, _parent_community_id, _text, _user_id);
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_comment(_parent_post_id INTEGER, _text VARCHAR, _user_id INTEGER DEFAULT NULL, _parent_comment_id INTEGER DEFAULT NULL) RETURNS comments AS 
$$
DECLARE
	new_entity_id INTEGER;
	new_comment comments%ROWTYPE;
BEGIN
	INSERT INTO entities (entity_id) VALUES (DEFAULT) RETURNING entity_id INTO new_entity_id;
	INSERT INTO comments (entity_id, parent_post_id, parent_comment_id, text, user_id) VALUES (new_entity_id, _parent_post_id, _parent_comment_id, _text, _user_id) RETURNING * INTO new_comment;
	RETURN new_comment;
END
$$
LANGUAGE plpgsql;

/*

	Metadata


*/

/*

CREATE OR REPLACE FUNCTION get_comment_count_for_entity_id(_entity_id INTEGER) RETURNS INTEGER AS 
$$ 
BEGIN
	RETURN (SELECT COUNT(*) AS comment_count FROM comments WHERE comments.parent_post_id = _entity_id OR comments.parent_comment_id = _entity_id);
END 
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_reaction_count_for_entity_id(_entity_id INTEGER) RETURNS INTEGER AS 
$$
BEGIN
	RETURN (SELECT COUNT(*) AS reaction_count FROM reactions WHERE reactions.parent_entity_id = _entity_id);
END
$$
LANGUAGE plpgsql;*/

CREATE OR REPLACE FUNCTION did_user_react_to_entity_id(_entity_id INTEGER, _user_id INTEGER DEFAULT NULL) RETURNS boolean AS 
$$ 
BEGIN

	IF _user_id IS NULL THEN
		RETURN FALSE;
	END IF;

	RETURN EXISTS (SELECT * FROM reactions WHERE parent_entity_id =_entity_id AND user_id = _user_id);

END
$$
LANGUAGE plpgsql;

/*

CREATE OR REPLACE FUNCTION get_metadata_for_entity_id(_entity_id INTEGER, _login VARCHAR DEFAULT NULL) RETURNS TABLE (comment_count INTEGER, reaction_count INTEGER, reacted boolean) AS
$$ 
BEGIN
	RETURN QUERY (SELECT get_comment_count_for_entity_id(_entity_id), get_reaction_count_for_entity_id(_entity_id), did_user_react_to_entity_id(_entity_id, _login));
END 
$$
LANGUAGE plpgsql;
*/

CREATE OR REPLACE FUNCTION update_comment_count() RETURNS TRIGGER AS 
$$ 
BEGIN
	IF TG_OP = 'INSERT' THEN
	
		UPDATE posts SET comment_count = comment_count + 1 WHERE posts.entity_id = NEW.parent_post_id;

	ELSIF TG_OP = 'DELETE' THEN

    	UPDATE posts SET comment_count = comment_count - 1 WHERE posts.entity_id = OLD.parent_post_id;

	END IF;

	RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER update_comment_count AFTER INSERT OR DELETE ON comments FOR EACH ROW EXECUTE PROCEDURE update_comment_count();

