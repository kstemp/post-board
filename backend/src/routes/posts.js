const express = require('express');
const router = express.Router();
const string = require('../util/string');
const db = require('../db');

router.get('/', (req, res) => {
	db.any('SELECT * FROM posts ORDER BY date DESC')
		.then(data => res.status(200).send(data))
		.catch(error => res.sendStatus(500));
});

router.post('/', (req, res) => {
	if (string.isEmptyOrOnlySpaces(req.body.text)) {
		return res.sendStatus(400);
	}

	db.none('INSERT INTO posts (text) VALUES ($1)', [req.body.text])
		.then(() => res.sendStatus(200))
		.catch(error => res.sendStatus(500));
});

router.get('/:id/comments', (req, res) => {
	// TODO check whether post ID is valid, etc.
	const reqPostID = parseInt(req.params.id);

	db.any('SELECT * FROM comments WHERE post_id=$1 ORDER BY date DESC', [
		reqPostID
	])
		.then(data => res.status(200).send(data))
		.catch(error => res.sendStatus(500));
});

router.post('/:id/comments', (req, res) => {
	//TODO check whether post ID exists
	// TODO check whether req body is valid, ID is nonempty etc.
	// TODO nonempty text...
	const reqPostID = parseInt(req.params.id);

	db.none('INSERT INTO comments (post_id, text) VALUES ($1, $2)', [
		reqPostID,
		req.body.text
	])
		.then(() => res.sendStatus(200))
		.catch(error => res.sendStatus(500));

	//	TEMP_POSTS.find(post => post.id === reqPostID).comments.push({
	//		text: req.body.text
	//	});
	//	return res.sendStatus(200);
});

module.exports = router;
