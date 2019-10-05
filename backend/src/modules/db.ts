import pgpromise, { QueryParam, errors } from 'pg-promise';

import { Request, Response } from 'express';

const POSTGRES_USER = 'postgres';
const POSTGRES_PASSWORD = 'postgres';
const POSTGRES_HOST = 'localhost';
const POSTGRES_PORT = 5432;
const POSTGRES_DB = 'post_db';
const postgresURL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export const PSQLERR = {
	FOREIGN_KEY_VIOLATION: '23503',
	UNIQUE_VIOLATION: '23505'
};

/*
export const execSQLQuery = (
	req: Request,
	res: Response,
	query: QueryParam,
	values?: any,
	discardData?: boolean
) =>
	db
		.oneOrNone(query, values)
		.then(data => {
			console.log('DATA: ', data);
			return !discardData
				? res.status(200).send(data)
				: res.sendStatus(204);
		})
		.catch(error => {
			console.log(error);
			// TODO better error checks
			if (error.code === errors.queryResultErrorCode.noData) {
				return res.sendStatus(404);
			}
			// most likely means that the user tried to react to nonexistent entity, or sth like that
			if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
				return res.sendStatus(400);
			}
			// user tried for instance to react twice to the same entity
			if (error.code === PSQLERR.UNIQUE_VIOLATION) {
				return res.sendStatus(400);
			}

			return res.sendStatus(500);
		});
*/

export const getCodeFromError = (error?: any) => {
	if (error.code === errors.queryResultErrorCode.noData) {
		return 404;
	}
	// most likely means that the user tried to react to nonexistent entity, or sth like that
	if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
		return 400;
	}
	// user tried for instance to react twice to the same entity
	if (error.code === PSQLERR.UNIQUE_VIOLATION) {
		return 400;
	}

	return 500;
};

const db = pgpromise({})(postgresURL);

export default db;
