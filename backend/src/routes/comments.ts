import express from 'express';
import verifyToken from '../modules/verify-token';
import { sanitize, check, query } from 'express-validator';
import db, { PSQLERR, execSQLQuery } from '../modules/db';
import { checkValidation } from '../modules/validator';
import { verify } from 'crypto';

const router = express.Router({ mergeParams: true });

router.post(
	'/',
	[
		sanitize('text').trim(),
		check('text', 'Comment text cannot be empty')
			.not()
			.isEmpty(),
		check('text', 'bounds TODO').isLength({ max: 1200 }),
		query('parent_comment_id')
			.optional()
			.isInt({ min: 1 })
	],
	checkValidation,
	verifyToken(false),
	(req: express.Request, res: express.Response) =>
		db
			.one('SELECT * FROM create_comment($1, $2, $3, $4)', [
				req.params['post_id'],
				req.body.text,
				(req as any).login,
				req.query['parent_comment_id']
			])
			.then(data => {
				console.log(data);
				return res.status(200).send(data);
			})

			.catch(error => {
				console.log(error);
				if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
					return res.sendStatus(404);
				}
				return res.sendStatus(500);
			})
);

router.get(
	'/',
	[
		query('parent_comment_id')
			.optional()
			.isInt({ min: 1 })
	],
	checkValidation,
	verifyToken(false),
	(req: express.Request, res: express.Response) =>
		db
			.manyOrNone(
				`SELECT * FROM comments, get_metadata_for_entity_id(comments.entity_id, $3) WHERE parent_post_id = $1 AND parent_comment_id ${
					req.query['parent_comment_id'] ? ' = $2' : 'IS NULL'
				}`,
				[
					req.params['post_id'],
					req.query['parent_comment_id'],
					(req as any).login
				]
			)
			.then(comments => res.status(200).send(comments))
			.catch(err => console.log(err))
);

module.exports = router;
