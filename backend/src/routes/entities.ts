import express, { Request, Response } from 'express';
import db, { PSQLERR } from '../modules/db';
import { check, sanitize, query } from 'express-validator';
import verifyToken from '../modules/verify-token';
import { checkValidation } from '../modules/validator';
const router = express.Router();

router.get(
	'/:id/',
	[check('id').isInt()],
	checkValidation,
	verifyToken(false),
	(req: Request, res: Response) => {
		const SQLquery =
			'SELECT * FROM get_entity_by_id($1), did_user_react_to_entity_id($1, $2) AS reacted';

		db.one(SQLquery, [req.params['id'], (req as any).userID])
			.then(data => res.status(200).send(data))
			.catch(error => {
				console.log(error);
				return res.sendStatus(500);
			});
	}
);

router.get(
	'/:id/children',
	[check('id').isInt()],
	checkValidation,
	verifyToken(false),
	(req: Request, res: Response) => {
		const SQLquery = 'SELECT * FROM get_entities_by_parent_id($1)';

		db.manyOrNone(SQLquery, [req.params['id'], (req as any).userID])
			.then(data => res.status(200).send(data))
			.catch(error => {
				console.log(error);
				return res.sendStatus(500);
			});
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
			return res.sendStatus(500);
		}
	}
);

module.exports = router;
