const express = require('express');
const router = express.Router();
const db = require('../db');
const string = require('../util/string');

router.get('/:communityID', (req, res) => {
	const reqCommunityID = parseInt(req.params.communityID);

	db.any('SELECT * FROM posts WHERE community_id = $1', [
		// ORDER BY date DESC
		reqCommunityID
	])
		.then(data => res.status(200).send(data))
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
});

router.post('/:communityID', (req, res) => {
	if (string.isEmptyOrOnlySpaces(req.body.text)) {
		return res.sendStatus(400);
	}

	const reqCommunityID = parseInt(req.params.communityID);

	db.none('INSERT INTO posts (community_id, text) VALUES ($1, $2)', [
		reqCommunityID,
		req.body.text
	])
		.then(() => res.sendStatus(200))
		.catch(error => {
			console.log(error);
			return;
			res.sendStatus(500);
		});
});

module.exports = router;
