import db from './db';
import { ValidationError, Result, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const checkLoginExists = async (login: string) =>
	new Promise((resolve, reject) => {
		db.one('SELECT EXISTS (SELECT 1 FROM users WHERE login=$1)', [login])
			.then(result => resolve((result as any).exists))
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
) => (validationResult(req).isEmpty() ? next() : res.sendStatus(422));
