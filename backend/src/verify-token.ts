/*

    Middleware for token verification.

*/

import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from './config';

const verifyToken = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	console.log(req.headers);

	if (!req.headers.token) {
		return res.sendStatus(403);
	}

	const token = req.headers.token as string;

	console.log('The token is ', token);

	jwt.verify(token, SECRET, (err, decoded) => {
		if (err) {
			return res.sendStatus(403);
		}

		next();
	});
};

export default verifyToken;
