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
			.isEmpty(),
		check('text', 'bounds TODO').isLength({ max: 1200 })
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
					return res.sendStatus(404);
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
