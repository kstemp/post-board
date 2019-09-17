import express, { Request, Response } from 'express';
import db, { PSQLERR } from '../modules/db';
import { check, sanitize, validationResult, query } from 'express-validator';
import verifyToken from '../modules/verify-token';

const router = express.Router();

router.post(
	'/',
	[
		sanitize('text').trim(),
		check('text', 'Post text must not be empty')
			.not()
			.isEmpty(),
		query('communityID', 'community ID must be a numeric value').isInt()
	],
	verifyToken,
	(req: Request, res: Response) => {
		const errors = validationResult(req); // TODO we need one function for all of these
		if (!errors.isEmpty()) {
			return res.status(422).send(errors.array());
		}

		console.log('HERE , ', (req as any).login);

		db.one('INSERT INTO entities DEFAULT VALUES RETURNING entity_id')
			.then(result => {
				console.log('RESULT: ', result);

				const entityID = result.entity_id;

				const reqCommunityID = parseInt(req.query.communityID);

				const [SQLquery, queryParams] = (req as any).login
					? [
							'INSERT INTO posts (entity_id, parent_community_id, text, login) VALUES ($1, $2, $3, $4)',
							[
								entityID,
								reqCommunityID,
								req.body.text,
								(req as any).login
							]
					  ]
					: [
							'INSERT INTO posts (entity_id, parent_community_id, text) VALUES ($1, $2, $3)',
							[entityID, reqCommunityID, req.body.text]
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
			})
			.catch(err => {
				console.log(err);
				res.sendStatus(500);
			});
	}
);

// TODO verify postID
router.get('/:postID/', (req: Request, res: Response) => {
	const reqPostID = parseInt(req.params.postID);

	db.one('SELECT * FROM posts WHERE entity_id=$1', [reqPostID])
		.then(data => res.status(200).send(data))
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
});

/*
metadata
 */
// TODO verify postID
router.get('/:postID/metadata', verifyToken, (req: Request, res: Response) => {
	const reqPostID = parseInt(req.params.postID);

	db.many(
		'SELECT COUNT(*) FROM comments WHERE parent_post_id=$1 UNION SELECT COUNT(*) FROM reactions WHERE parent_entity_id=$1',
		[reqPostID]
	)
		.then(result => {
			console.log(result);
			res.status(200).send({
				commentCount: parseInt(result[1].count),
				reactionCount: parseInt(result[0].count)
				//	,
				//reactionCount: parseInt(result.count)
			});
		})
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
});

router.get('/:postID/comments', (req: Request, res: Response) => {
	const reqPostID = parseInt(req.params.postID);

	return db
		.any('SELECT * FROM comments WHERE parent_post_id = $1', [reqPostID])
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

module.exports = router;
