import express, { Request, Response } from 'express';
import db, { PSQLERR, getCodeFromError } from '../modules/db';
import { check, sanitize, query } from 'express-validator';
import verifyToken from '../modules/verify-token';
import { checkValidation } from '../modules/validator';
const router = express.Router();

router.get(
	'/:id/',
	[check('id').isInt()],
	checkValidation,
	verifyToken(false),
	async (req: Request, res: Response) => {
		try {
			const data = await db.one(
				'SELECT * FROM get_entity_by_id($1), did_user_react_to_entity_id($1, $2) AS reacted',
				[req.params['id'], (req as any).userID]
			);

			res.status(200).send(data);
		} catch (error) {
			console.log(error);
			return res.sendStatus(getCodeFromError(error));
		}
	}
);

router.get(
	'/:id/children',
	[check('id').isInt()],
	checkValidation,
	verifyToken(false),
	async (req: Request, res: Response) => {
		try {
			const entities = await db.manyOrNone(
				'SELECT * FROM get_entities_by_parent_id($1)',
				[req.params['id'], (req as any).userID]
			);
			res.status(200).send(entities);
		} catch (error) {
			console.log(error);
			return res.sendStatus(getCodeFromError(error));
		}
	}
);

router.post(
	'/:id/',
	[check('id').isInt()],
	checkValidation,
	verifyToken(false),
	async (req: Request, res: Response) => {
		try {
			const entity = await db.one(
				// TODO use create_entity or sth
				'INSERT INTO entities (parent_entity_id, content_type, content, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
				[
					req.params['id'],
					'html',
					req.body['text'],
					(req as any).userID
				]
			);
			return res.status(200).send(entity);
		} catch (error) {
			console.log(error);
			return res.sendStatus(getCodeFromError(error));
		}
	}
);

module.exports = router;
