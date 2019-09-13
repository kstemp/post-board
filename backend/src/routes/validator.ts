import db from '../db';
import pgPromise = require('pg-promise');
import { validationResult, ValidationError, Result } from 'express-validator';

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
		.map(result => ({ id: result.param, message: result.msg }));
