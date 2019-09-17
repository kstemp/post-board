import express from 'express';
import verifyToken from '../modules/verify-token';
import { sanitize, check, validationResult } from 'express-validator';
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
		console.log('PPP ', req.params.postID);

		db.one('INSERT INTO entities DEFAULT VALUES RETURNING entity_id').then(
			result => {
				//	console.log(result);

				const entityID = result.entity_id;
				//	console.log('REQUEST: ', req);

				const reqPostID = parseInt(req.params.postID);

				//	console.log('POST ID: ', reqPostID);

				const [SQLquery, queryParams] = (req as any).login
					? [
							'INSERT INTO comments (entity_id, parent_post_id, text, login) VALUES ($1, $2, $3, $4)',
							[
								entityID,
								reqPostID,
								req.body.text,
								(req as any).login
							]
					  ]
					: [
							'INSERT INTO comments (entity_id, parent_post_id, text) VALUES ($1, $2, $3)',
							[entityID, reqPostID, req.body.text]
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
		);
	}
);

router.get('/', (req, res) => {
	const reqPostID = parseInt(req.params.postID);

	return db
		.any('SELECT * FROM comments WHERE parent_post_id = $1', [reqPostID])
		.then(data => res.status(200).send(data))
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
});

module.exports = router;
