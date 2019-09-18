import express from 'express';
import verifyToken from '../modules/verify-token';
import { sanitize, check } from 'express-validator';
import db, { PSQLERR } from '../modules/db';
import { checkValidation } from '../modules/validator';

const router = express.Router({ mergeParams: true });

router.post(
	'/',
	[
		sanitize('text').trim(),
		check('text', 'Comment text cannot be empty')
			.not()
			.isEmpty()
	],
	verifyToken(false),
	checkValidation,
	(req: express.Request, res: express.Response) => {
		db.any('SELECT create_comment($1, $2, $3)', [
			req.params.postID,
			req.body.text,
			(req as any).login
		])
			.then(() => res.sendStatus(204))
			.catch(error => {
				console.log(error);
				if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
					return res.sendStatus(400);
				}
				return res.sendStatus(500);
			});
	}
);

router.get('/', (req, res) =>
	db
		.any('SELECT * FROM comments WHERE parent_post_id = $1', [
			req.params.postID
		])
		.then(data => res.status(200).send(data))
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		})
);

module.exports = router;

/*
		db.one('INSERT INTO entities DEFAULT VALUES RETURNING entity_id').then(
			result => {
				//	console.log(result);

				const [SQLquery, queryParams] = (req as any).login
					? [
							'INSERT INTO comments (entity_id, parent_post_id, text, login) VALUES ($1, $2, $3, $4)',
							[
								result.entity_id,
								req.params.postID,
								req.body.text,
								(req as any).login
							]
					  ]
					: [
							'INSERT INTO comments (entity_id, parent_post_id, text) VALUES ($1, $2, $3)',
							[result.entity_id, req.params.postID, req.body.text]
					  ];

				return db
					.none(SQLquery, queryParams)
					.then(() => res.sendStatus(204))
					.catch(error => {
						console.log(error);
						if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
							return res.sendStatus(400);
						}
						return res.sendStatus(500);
					});
			}
		);*/
