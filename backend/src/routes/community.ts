import express from 'express';
import db from '../db';
import { check, sanitize, validationResult } from 'express-validator';

const router = express.Router();

// TODO check for communityID - whether it exists
router.get('/:communityID', (req, res) => {
	const reqCommunityID = parseInt(req.params.communityID);

	db.any(
		'SELECT * FROM posts WHERE community_id = $1 LIMIT 20', // ORDER BY CREATED_ON LIMIT 5
		[reqCommunityID]
	)
		.then(data => res.status(200).send(data))
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
});

// TODO check for communityID - whether it exists
router.post(
	'/:communityID',
	[
		sanitize('text').trim(),
		check('text', 'Post text must not be empty')
			.not()
			.isEmpty()
	],
	(req: express.Request, res: express.Response) => {
		const errors = validationResult(req); // TODO we need one function for all of these
		if (!errors.isEmpty()) {
			return res.status(422).send(errors.array());
		}

		console.log('HERE , ', (req as any).login);

		const reqCommunityID = parseInt(req.params.communityID);
		let SQLquery, queryParams;

		if ((req as any).login) {
			SQLquery =
				'INSERT INTO posts (community_id, text, login) VALUES ($1, $2, $3)';
			queryParams = [reqCommunityID, req.body.text, (req as any).login];
		} else {
			SQLquery = 'INSERT INTO posts (community_id, text) VALUES ($1, $2)';
			queryParams = [reqCommunityID, req.body.text];
		}

		//	const query = INSERT INTO posts (community_id, text) VALUES ($1, $2)

		db.none(SQLquery, queryParams)
			.then(() => res.sendStatus(200))
			.catch(error => {
				console.log(error);
				return;
				res.sendStatus(500);
			});
	}
);

module.exports = router;
