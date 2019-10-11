import express, { Request, Response } from 'express';
import db, { PSQLERR, getCodeFromError } from '../modules/db';
import { check, sanitize, query, oneOf, header } from 'express-validator';
import { checkValidation } from '../modules/validator';
import uuidv4 from 'uuid/v4';
import fs from 'fs';
import { verifyLoggedIn } from '../modules/verify-token';
const router = express.Router();

router.get(
	'/:id/',
	[check('id').isInt()],
	checkValidation,
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
	async (req: Request, res: Response) => {
		try {
			const entities = await db.manyOrNone(
				'SELECT * FROM entities, did_user_react_to_entity_id(entities.entity_id, $2) AS reacted WHERE parent_entity_id = $1',
				[req.params['id'], (req as any).userID]
			);
			res.status(200).send(entities);
		} catch (error) {
			console.log(error);
			return res.sendStatus(getCodeFromError(error));
		}
	}
);

/*
TODO
* input validation
*/
router.post(
	'/',
	/*	oneOf([
		header('content-type').equals('image/*'),
		header('content-type').equals('text/html')
	]),*/
	oneOf([
		query('parent_board_id').isAlphanumeric(),
		query('parent_entity_id').isInt({ min: 1 })
	]),
	checkValidation,

	async (req: Request, res: Response) => {
		try {
			const [contentType, content] = req.is('image/*')
				? [
						'file',
						`${uuidv4()}.${(
							req.headers['content-type'] || ''
						).slice(6)}` /* for instance, XXX-...-XXX.jpeg */
				  ]
				: ['html', req.body];

			const parentType = req.query['parent_board_id']
				? 'parent_board_id'
				: 'parent_entity_id';

			const parentID =
				req.query['parent_board_id'] || req.query['parent_entity_id'];

			const entity = await db.one(
				`INSERT INTO entities (type, ${parentType}, content_type, content, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
				['post', parentID, contentType, content, (req as any)['userID']]
			);

			if (req.is('image/*')) {
				fs.writeFileSync(`img/${content}`, req.body);
			}

			return res.status(200).send(entity);
		} catch (error) {
			console.log(error);
			return res.sendStatus(getCodeFromError(error));
		}
	}
);

router.delete(
	'/:id/',
	[check('id').isInt()],
	checkValidation,
	verifyLoggedIn,
	async (req: Request, res: Response) => {
		try {
			const result = await db.one(
				'SELECT delete_entity($1, $2) AS count',
				[req.params['id'], (req as any)['userID']]
			);

			console.log(result);
			return result['count'] === 0
				? res.sendStatus(403)
				: res.sendStatus(204);
		} catch (error) {
			console.log(error);
			return res.sendStatus(getCodeFromError(error));
		}
	}
);

module.exports = router;
