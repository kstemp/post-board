import db from './db';
import { ValidationError, Result } from 'express-validator';

export const checkLoginExists = async (login: string) =>
	new Promise((resolve, reject) => {
		db.one('SELECT EXISTS (SELECT 1 FROM users WHERE login=$1)', [login])
			.then(result => {
				return resolve((result as any).exists);
			})
			.catch(err => reject(err));
	});

export const checkCommunityExists = async (communityID: number) =>
	new Promise((resolve, reject) => {
		db.one('SELECT EXISTS (SELECT 1 FROM communities WHERE id=$1)', [
			communityID
		])
			.then(result => {
				return resolve((result as any).exists);
			})
			.catch(err => reject(err));
	});

export const checkPostExists = async (postID: number) =>
	new Promise((resolve, reject) => {
		db.one('SELECT EXISTS (SELECT 1 FROM posts WHERE id=$1)', [postID])
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
