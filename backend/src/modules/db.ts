import pgpromise from 'pg-promise';
import {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DB
} from './config';

export const PSQLERR = {
	FOREIGN_KEY_VIOLATION: '23503'
};

const postgresURL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const db = pgpromise({})(postgresURL);

export default db;
