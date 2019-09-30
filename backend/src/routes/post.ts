import express, { Request, Response } from 'express';
import db, { PSQLERR } from '../modules/db';
import { check, sanitize, query } from 'express-validator';
import verifyToken from '../modules/verify-token';
import { checkValidation } from '../modules/validator';
const router = express.Router();

router.use('/:post_id/comments', require('./comments')); // TODO verification of post_id

router.get(
	'/:postID/',
	[
		check('postID', 'Post ID must be an integer').isInt(),
		query('metadata_only')
			.optional()
			.isBoolean()
	],
	checkValidation,
	verifyToken(false),
	(req: Request, res: Response) => {
		//const SQLquery =req.query.metadata_only
		//? 'SELECT * FROM get_metadata_for_entity_id($1, $2)'*/
		const SQLquery =
			'SELECT * FROM get_entity_by_id($1), did_user_react_to_entity_id($1, $2) AS reacted';
		//: 'SELECT * FROM get_post_by_id($1), get_metadata_for_entity_id($1, $2)';

		db.one(SQLquery, [req.params.postID, (req as any).userID])
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
		check('text', 'bounds TODO').isLength({ max: 1200 }),
		query('communityID', 'community ID must be an integer').isInt()
	],
	checkValidation,
	verifyToken(false),
	(req: Request, res: Response) => {
		db.any('SELECT create_post($1, $2, $3)', [
			req.query.communityID,
			req.body.text,
			(req as any).userID
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
		const login = (req as any).userID;

		const SQLquery = `WITH deleted AS (
			DELETE FROM posts 
			WHERE posts.entity_id = $1 
			AND (
				posts.user_id = $2 
				OR EXISTS (
							SELECT * FROM user_roles 
							WHERE user_roles.community_id = posts.parent_community_id  
							AND user_roles.user_id = $2 
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
