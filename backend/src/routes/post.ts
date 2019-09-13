import express from 'express';
import db from '../db';
import { param, check, sanitize, validationResult } from 'express-validator';

const router = express.Router();

router.get('/:postID/', (req, res) => {
	// TODO check whether post ID is valid, etc.
	const reqPostID = parseInt(req.params.postID);

	db.any('SELECT * FROM posts WHERE id=$1', [reqPostID])
		.then(data => res.status(200).send(data))
		.catch(error => res.sendStatus(500));
});

router.get('/:postID/comments', (req, res) => {
	// TODO check whether post ID is valid, etc.
	const reqPostID = parseInt(req.params.postID);

	db.any('SELECT * FROM comments WHERE post_id=$1 ORDER BY date DESC', [
		reqPostID
	])
		.then(data => res.status(200).send(data))
		.catch(error => res.sendStatus(500));
});

//TODO check whether post ID exists
router.post(
	'/:postID/comments',
	[
		sanitize('text').trim(),
		check('text', 'Comment text cannot be empty')
			.not()
			.isEmpty()
	],
	(req: express.Request, res: express.Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).send(errors.array());
		}

		const reqPostID = parseInt(req.params.postID);

		return db
			.none('INSERT INTO comments (post_id, text) VALUES ($1, $2)', [
				reqPostID,
				req.body.text
			])
			.then(() => res.sendStatus(204))
			.catch(error => res.sendStatus(500));
	}
);

module.exports = router;
