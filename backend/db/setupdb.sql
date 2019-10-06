SET client_encoding TO 'UTF8';

CREATE DATABASE post_db ENCODING 'UTF8'	LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8' TEMPLATE template0;

\c post_db;

CREATE TABLE users (
	user_id SERIAL,
	PRIMARY KEY (user_id),

	name VARCHAR NOT NULL,

	email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL
);

CREATE TABLE user_data (
	user_id INTEGER NOT NULL REFERENCES users (user_id),
	PRIMARY KEY (user_id),

	bio VARCHAR
);

CREATE TABLE nonactive_users (

	email VARCHAR,
	password VARCHAR NOT NULL,
	email_hash VARCHAR,
	
	name VARCHAR NOT NULL,

	PRIMARY KEY (email, email_hash)

);

CREATE TABLE boards (
	id VARCHAR,
	PRIMARY KEY (id), 
	
	title VARCHAR NOT NULL,
	description VARCHAR NOT NULL DEFAULT 'No description provided.',

	created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),

	subscribed_users INTEGER NOT NULL DEFAULT 0
);
-- 
/*
CREATE TYPE type_role AS ENUM ('admin');

CREATE TABLE user_roles (

	community_id INTEGER NOT NULL REFERENCES communities (community_id),
	user_id INTEGER NOT NULL REFERENCES users (user_id),

	PRIMARY KEY (community_id, user_id),

	role type_role NOT NULL DEFAULT 'admin'

);*/

CREATE TABLE entities (

	entity_id SERIAL,
	PRIMARY KEY (entity_id),

	type VARCHAR, /* TODO make an enum*/

	parent_board_id VARCHAR REFERENCES boards (id), 
	parent_entity_id INTEGER REFERENCES entities (entity_id),

	user_id INTEGER REFERENCES users (user_id),

	created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),

	content_type VARCHAR NOT NULL, /* TODO make an enum IMAGE/HTML */ 
	content VARCHAR NOT NULL,

	child_count INTEGER NOT NULL DEFAULT 0,
	reaction_count INTEGER NOT NULL DEFAULT 0

);

CREATE TABLE reactions (

	reaction_id SERIAL,
	parent_entity_id INTEGER NOT NULL REFERENCES entities (entity_id),

	user_id INTEGER NOT NULL REFERENCES users (user_id),

	PRIMARY KEY (parent_entity_id, user_id)

);

/*
CREATE OR REPLACE FUNCTION get_entities_by_parent_id(_parent_entity_id INTEGER, _user_id INTEGER DEFAULT NULL) RETURNS SETOF entities AS 
$$
BEGIN
	RETURN QUERY (SELECT * FROM entities, did_user_react_to_entity_id(entities.entity_id, _user_id) AS reacted WHERE parent_entity_id = _parent_entity_id);
END
$$
LANGUAGE plpgsql;
*/

/*

	selector for reactions

*/

CREATE OR REPLACE FUNCTION did_user_react_to_entity_id(_entity_id INTEGER, _user_id INTEGER DEFAULT NULL) RETURNS boolean AS 
$$ 
BEGIN

	IF _user_id IS NULL THEN
		RETURN FALSE;
	END IF;

	RETURN EXISTS (SELECT * FROM reactions WHERE parent_entity_id = _entity_id AND user_id = _user_id);

END
$$
LANGUAGE plpgsql;

/*

	reaction counter trigger

*/

CREATE OR REPLACE FUNCTION update_reaction_count() RETURNS TRIGGER AS 
$$ 
BEGIN
	IF TG_OP = 'INSERT' THEN
		UPDATE entities SET reaction_count = reaction_count + 1 WHERE entities.entity_id = NEW.parent_entity_id;
	ELSIF TG_OP = 'DELETE' THEN
    	UPDATE entities SET reaction_count = reaction_count - 1 WHERE entities.entity_id = OLD.parent_entity_id;
	END IF;

	RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER update_reaction_count AFTER INSERT OR DELETE ON reactions FOR EACH ROW EXECUTE PROCEDURE update_reaction_count();

/*

	child counter trigger

*/

CREATE OR REPLACE FUNCTION update_child_count() RETURNS TRIGGER AS 
$$ 
BEGIN

	IF NEW.parent_entity_id IS NULL THEN 
		RETURN NEW;
	END IF;

	IF TG_OP = 'INSERT' THEN
		UPDATE entities SET child_count = child_count + 1 WHERE entities.entity_id = NEW.parent_entity_id;
	ELSIF TG_OP = 'DELETE' THEN
    	UPDATE entities SET child_count = child_count - 1 WHERE entities.entity_id = OLD.parent_entity_id;
	END IF;

	RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER update_child_count AFTER INSERT OR DELETE ON entities FOR EACH ROW EXECUTE PROCEDURE update_child_count();