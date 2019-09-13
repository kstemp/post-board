import pgpromise from 'pg-promise';

const pgp = pgpromise({});

const cn = 'postgres://postgres:postgres@localhost:5432/post_db';

const db = pgp(cn);

export default db;
