import db from '../db';
import pgPromise = require('pg-promise');

export const checkLoginExists = async (login: string) => {
	const result = await db.one(
		'SELECT EXISTS (SELECT 1 FROM users WHERE login=$1)',
		[login]
	);

	console.log(
		login + ' ',
		(result as any).exists ? ' exists' : ' is not here'
	);
	return (result as any).exists;
};
