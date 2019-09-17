import express from 'express';
import { check } from 'express-validator';
import verifyToken from '../modules/verify-token';
import db, { PSQLERR } from '../modules/db';
import { checkValidation } from '../modules/validator';

const router = express.Router();

router.post(
	'/',
	[check('entityID').isNumeric(), check('token').isJWT()],
	checkValidation,
	verifyToken(true),
	(req: express.Request, res: express.Response) => {
		const entityID = parseInt(req.query.entityID);

		const login = (req as any).login;

		db.none(
			'INSERT INTO reactions (parent_entity_id, login) VALUES ($1, $2)',
			[entityID, login]
		)
			.then(() => res.sendStatus(204))
			.catch(error => {
				console.log(error);
				if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
					return res.sendStatus(400);
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

module.exports = router;
