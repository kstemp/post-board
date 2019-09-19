import express from 'express';
import { query } from 'express-validator';
import verifyToken from '../modules/verify-token';
import db, { PSQLERR } from '../modules/db';
import { checkValidation } from '../modules/validator';

const router = express.Router();

router.post(
	'/',
	[query('entityID').isNumeric()],
	checkValidation,
	verifyToken(true),
	(req: express.Request, res: express.Response) => {
		const login = (req as any).login;

		db.none(
			'INSERT INTO reactions (parent_entity_id, login) VALUES ($1, $2)',
			[req.query.entityID, login]
		)
			.then(() => res.sendStatus(204))
			.catch(error => {
				console.log(error);
				if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
					return res.sendStatus(404); // TODO consistency of response status codes
				}
				if (error.code === PSQLERR.UNIQUE_VIOLATION) {
					return res
						.status(400)
						.json({ message: 'Already reacted to this entity' });
				}
				return res.sendStatus(500);
			});
	}
);

router.delete(
	'/',
	[query('entityID').isNumeric()],
	checkValidation,
	verifyToken(true),
	(req: express.Request, res: express.Response) => {
		const login = (req as any).login;

		db.none(
			'DELETE FROM reactions WHERE reactions.parent_entity_id = $1 AND reactions.login = $2 ',
			[req.query.entityID, login]
		)
			.then(() => res.sendStatus(204))
			.catch(error => {
				console.log(error);
				// TODO why the fuck is the code below
				if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
					return res.sendStatus(404);
				}
				return res.sendStatus(500);
			});
	}
);

module.exports = router;
