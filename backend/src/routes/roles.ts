import express from 'express';
import verifyToken from '../modules/verify-token';
import { checkValidation } from '../modules/validator';
import { check } from 'express-validator';
import db from '../modules/db';

const router = express.Router();

router.get(
	'/:userLogin',
	[check('userLogin').isAlphanumeric()],
	checkValidation,
	verifyToken(true),
	(req: express.Request, res: express.Response) => {
		const login = (req as any).login;

		db.any('SELECT community_id, role FROM user_roles WHERE login = $1', [
			login
		])
			.then(data => {
				console.log(data);
				return res.status(200).send(data);
			})
			.catch(err => {
				console.log(err);
				return res.sendStatus(500);
			});
	}
);

module.exports = router;
