import express, { Request, Response } from 'express';
import db from '../db';
import { check, sanitize, validationResult } from 'express-validator';
import verifyToken from '../verify-token';
import { checkCommunityExists } from '../validator';

const router = express.Router();

router.get(
	'/:communityID',
	[
		check('communityID', 'Community with specified ID must exists')
			.exists()
			.custom(communityID =>
				checkCommunityExists(communityID)
					.then(exists =>
						exists ? Promise.resolve() : Promise.reject()
					)
					.catch(err => Promise.reject())
			)
	],
	(req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).send(errors.array());
		}

		const reqCommunityID = parseInt(req.params.communityID);

		db.any('SELECT * FROM posts WHERE community_id = $1', [reqCommunityID])
			.then(data => res.status(200).send(data))
			.catch(error => {
				console.log(error);
				return res.sendStatus(500);
			});
	}
);

// TODO check for communityID - whether it exists
router.post(
	'/:communityID',
	[
		sanitize('text').trim(),
		check('text', 'Post text must not be empty')
			.not()
			.isEmpty(),
		check('communityID', 'Community with specified ID must exist')
			.exists()
			.custom(communityID =>
				checkCommunityExists(communityID)
					.then(exists =>
						exists ? Promise.resolve() : Promise.reject()
					)
					.catch(err => Promise.reject())
			)
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
				return res.sendStatus(500);
			});
	}
);

module.exports = router;
