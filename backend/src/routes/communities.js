const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
	db.any('SELECT * FROM communities')
		.then(data => res.status(200).send(data))
		.catch(error => res.sendStatus(500));
});

module.exports = router;
