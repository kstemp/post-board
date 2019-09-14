import express, { Request, Response } from 'express';
import db, { PSQLERR } from '../modules/db';
import { check, sanitize, validationResult } from 'express-validator';
import verifyToken from '../modules/verify-token';

const router = express.Router();

router.get('/:postID/', (req: Request, res: Response) => {
	const reqPostID = parseInt(req.params.postID);

	db.any('SELECT * FROM posts WHERE id=$1', [reqPostID])
		.then(data => res.status(200).send(data))
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
});

// TODO check whet
router.get('/:postID/comments', (req: Request, res: Response) => {
	const reqPostID = parseInt(req.params.postID);

	db.any('SELECT * FROM comments WHERE post_id=$1', [reqPostID])
		.then(data => res.status(200).send(data))
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
});

router.post(
	'/:postID/comments',
	[
		sanitize('text').trim(),
		check('text', 'Comment text cannot be empty')
			.not()
			.isEmpty()
	],
	verifyToken,
	(req: express.Request, res: express.Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).send(errors.array());
		}

		const reqPostID = parseInt(req.params.postID);

		const [SQLquery, queryParams] = (req as any).login
			? [
					'INSERT INTO comments (post_id, text, login) VALUES ($1, $2, $3)',
					[reqPostID, req.body.text, (req as any).login]
			  ]
			: [
					'INSERT INTO comments (post_id, text) VALUES ($1, $2)',
					[reqPostID, req.body.text]
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

module.exports = router;
