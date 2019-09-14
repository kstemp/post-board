/*

    Middleware for token verification.

*/

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from './config';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.headers);

	if (!req.headers.token) {
		return next();
	}

	const token = req.headers.token as string;

	console.log('The token is ', token);

	jwt.verify(token, SECRET, (err, decoded) => {
		if (err) {
			return res.sendStatus(403);
		}

		console.log('Login: ', (decoded as any).login);
		(req as any).login = (decoded as any).login;

		return next();
	});
};

export default verifyToken;