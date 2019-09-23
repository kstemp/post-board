import pgpromise, { QueryParam, errors } from 'pg-promise';
import {
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DB
} from './config';
import { Request, Response } from 'express';

export const PSQLERR = {
	FOREIGN_KEY_VIOLATION: '23503',
	UNIQUE_VIOLATION: '23505'
};

export const execSQLQuery = (
	req: Request,
	res: Response,
	query: QueryParam,
	values?: any,
	discardData?: boolean
) =>
	db
		.one(query, values)
		.then(data => {
			console.log('DATA: ', data);
			return !discardData
				? res.status(200).send(data)
				: res.sendStatus(204);
		})
		.catch(err => {
			console.log(err);
			// TODO better error checks
			if (err.code === errors.queryResultErrorCode.noData) {
				return res.sendStatus(404);
			}

			return res.sendStatus(500);
		});

const postgresURL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const db = pgpromise({})(postgresURL);

export default db;
