const express = require('express');
const router = express.Router();
const db = require('../db');
const posts = require('./posts');

router.get('/', (req, res) => {
	db.any('SELECT * FROM communities ORDER BY name ASC')
		.then(data => res.status(200).send(data))
		.catch(error => res.sendStatus(500));
});

router.use(
	'/:communityID/',
	(req, res, next) => {
		req.communityID = req.params.communityID;
		next();
	},
	posts
);

module.exports = router;
