/*

    Middleware for token verification.

*/

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from './secret';

export const verifyLoggedIn = (
	req: Request,
	res: Response,
	next: NextFunction
) => ((req as any)['userID'] ? next() : res.sendStatus(401));

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//console.log(req.headers);
	if (!req.headers.token) {
		return next();
	}

	console.log('verifying token');

	const token = req.headers.token as string;

	//	console.log('The token is ', token);

	jwt.verify(token, SECRET, (err, decoded) => {
		if (err) {
			return res.sendStatus(401);
		}

		(req as any).userID = (decoded as any).userID;

		return next();
	});
};
