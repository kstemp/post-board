import express, { Request, Response } from 'express';
import db, { PSQLERR } from '../modules/db';
import { check, sanitize, query } from 'express-validator';
import verifyToken from '../modules/verify-token';
import { checkValidation } from '../modules/validator';
const router = express.Router();

router.use('/:postID/comments', require('./comments'));

router.get(
	'/:postID/',
	[
		check('postID', 'Post ID must be an integer').isInt(),
		query('metadata_only')
			.optional()
			.isBoolean()
	],
	checkValidation,
	(req: Request, res: Response) => {
		const SQLquery = req.query.metadata_only
			? 'SELECT get_comment_count_for_post_id($1) AS comment_count'
			: 'SELECT * FROM  get_post_by_id($1) NATURAL JOIN get_comment_count_for_post_id($1) AS comment_count';

		db.one(SQLquery, [req.params.postID])
			.then(data => res.status(200).send(data))
			.catch(error => {
				console.log(error);
				return res.sendStatus(500);
			});
	}
);

router.post(
	'/',
	[
		sanitize('text').trim(),
		check('text', 'Post text must not be empty')
			.not()
			.isEmpty(),
		query('communityID', 'community ID must be an integer').isInt()
	],
	checkValidation,
	verifyToken(false),
	(req: Request, res: Response) => {
		db.any('SELECT create_post($1, $2, $3)', [
			req.query.communityID,
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

router.delete(
	'/:postID',
	[check('postID', 'post ID must be an integer').isInt()],
	checkValidation,
	verifyToken(true),
	(req: Request, res: Response) => {
		const login = (req as any).login;

		const SQLquery = `WITH deleted AS (
			DELETE FROM posts 
			WHERE posts.entity_id = $1 
			AND (
				posts.login = $2 
				OR EXISTS (
							SELECT * FROM user_roles 
							WHERE user_roles.community_id = posts.parent_community_id  
							AND user_roles.login = $2 
							AND user_roles.role = 'admin'
						)
			) 
			RETURNING *
		) SELECT COUNT(*) FROM deleted`;

		return db
			.one(SQLquery, [req.params.postID, login])
			.then(result => {
				console.log(result);
				if ((result as any).count == 0) {
					return res.sendStatus(400); //TODO bad request or unauthorized?
				}
				return res.sendStatus(204);
			})
			.catch(err => {
				console.log(err);
				return res.sendStatus(500);
			});
	}
);

module.exports = router;

/*
		db.one('INSERT INTO entities DEFAULT VALUES RETURNING entity_id')
			.then(result => {
				const [SQLquery, queryParams] = (req as any).login
					? [
							'INSERT INTO posts (entity_id, parent_community_id, text, login) VALUES ($1, $2, $3, $4)',
							[
								result.entity_id,
								req.query.communityID,
								req.body.text,
								(req as any).login
							]
					  ]
					: [
							'INSERT INTO posts (entity_id, parent_community_id, text) VALUES ($1, $2, $3)',
							[
								result.entity_id,
								req.query.communityID,
								req.body.text
							]
					  ];

				db.none(SQLquery, queryParams)
					.then(() => res.sendStatus(200))
					.catch(error => {
						console.log(error);
						// this error means that there's no community of specified ID,
						// so hit the user with that 'Bad Request'
						// TODO or maybe 'not found'?
						if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
							return res.sendStatus(400);
						}
						return res.sendStatus(500);
					});
			})
			.catch(err => {
				console.log(err);
				res.sendStatus(500);
			});*/
