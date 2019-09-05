const pgp = require('pg-promise')({});

const cn = 'postgres://postgres:postgres@localhost:5432/post_db';

const db = pgp(cn);

module.exports = db;
