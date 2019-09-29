/*

    Middleware for token verification.

*/

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from './secret';

const verifyToken = (mustBeLoggedIn: boolean) => {
	return (req: Request, res: Response, next: NextFunction) => {
		//	console.log(req.headers);

		if (!req.headers.token) {
			if (mustBeLoggedIn) {
				return res.sendStatus(403);
			} else {
				return next();
			}
		}

		const token = req.headers.token as string;

		//	console.log('The token is ', token);

		jwt.verify(token, SECRET, (err, decoded) => {
			if (err) {
				return res.sendStatus(403);
			}

			(req as any).userID = (decoded as any).userID;

			return next();
		});
	};
};

export default verifyToken;
