import express from 'express';
import { query } from 'express-validator';
import verifyToken from '../modules/verify-token';
import { checkValidation } from '../modules/validator';
import db, { getCodeFromError } from '../modules/db';

const router = express.Router();

router.post(
	'/',
	[query('entityID').isNumeric()],
	checkValidation,
	async (req: express.Request, res: express.Response) => {
		try {
			await db.none(
				'INSERT INTO reactions (parent_entity_id, user_id) VALUES ($1, $2)',
				[req.query.entityID, (req as any).userID]
			);
			return res.sendStatus(200);
		} catch (e) {
			console.log(e);
			return res.sendStatus(getCodeFromError(e));
		}
	}
);

router.delete(
	'/',
	[query('entityID').isNumeric()],
	checkValidation,
	async (req: express.Request, res: express.Response) => {
		try {
			await db.none(
				'DELETE FROM reactions WHERE reactions.parent_entity_id = $1 AND reactions.user_id = $2',
				[req.query.entityID, (req as any).userID]
			);
			return res.sendStatus(200);
		} catch (e) {
			console.log(e);
			return res.sendStatus(getCodeFromError(e));
		}
	}
);
module.exports = router;
