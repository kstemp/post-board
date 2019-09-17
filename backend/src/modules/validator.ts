import db from './db';
import { ValidationError, Result, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const checkLoginExists = async (login: string) =>
	new Promise((resolve, reject) => {
		db.one('SELECT EXISTS (SELECT 1 FROM users WHERE login=$1)', [login])
			.then(result => {
				return resolve((result as any).exists);
			})
			.catch(err => reject(err));
	});

export const formatValidationResults = (
	validationResults: Result<ValidationError>
) =>
	validationResults
		.array()
		.map(result => `parameter: ${result.param}, problem: ${result.msg}`)
		.join('\n');

export const checkValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);
	return errors.isEmpty()
		? next()
		: res.status(422).send(formatValidationResults(errors));
};
