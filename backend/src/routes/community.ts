import express, { Request, Response } from 'express';
import db, { PSQLERR } from '../modules/db';
import { check, sanitize, validationResult } from 'express-validator';
import verifyToken from '../modules/verify-token';

const router = express.Router();

router.get('/:communityID', (req: Request, res: Response) => {
	const reqCommunityID = parseInt(req.params.communityID);

	db.any('SELECT * FROM posts WHERE community_id = $1', [reqCommunityID])
		.then(data => res.status(200).send(data))
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
});

router.post(
	'/:communityID',
	[
		sanitize('text').trim(),
		check('text', 'Post text must not be empty')
			.not()
			.isEmpty()
	],
	verifyToken,
	(req: Request, res: Response) => {
		const errors = validationResult(req); // TODO we need one function for all of these
		if (!errors.isEmpty()) {
			return res.status(422).send(errors.array());
		}

		console.log('HERE , ', (req as any).login);

		const reqCommunityID = parseInt(req.params.communityID);

		const [SQLquery, queryParams] = (req as any).login
			? [
					'INSERT INTO posts (community_id, text, login) VALUES ($1, $2, $3)',
					[reqCommunityID, req.body.text, (req as any).login]
			  ]
			: [
					'INSERT INTO posts (community_id, text) VALUES ($1, $2)',
					[reqCommunityID, req.body.text]
			  ];

		db.none(SQLquery, queryParams)
			.then(() => res.sendStatus(200))
			.catch(error => {
				console.log(error);
				// this error means that there's no community of specified ID,
				// so hit the user with that 'Bad Request'
				if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
					return res.sendStatus(400);
				}
				return res.sendStatus(500);
			});
	}
);

module.exports = router;
