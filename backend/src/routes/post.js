const express = require('express');
const router = express.Router();
const string = require('../util/string');
const db = require('../db');

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

router.post('/:postID/comments', (req, res) => {
	//TODO check whether post ID exists
	// TODO check whether req body is valid, ID is nonempty etc.
	// TODO nonempty text...
	const reqPostID = parseInt(req.params.postID);

	db.none('INSERT INTO comments (post_id, text) VALUES ($1, $2)', [
		reqPostID,
		req.body.text
	])
		.then(() => res.sendStatus(200))
		.catch(error => res.sendStatus(500));
});

module.exports = router;
