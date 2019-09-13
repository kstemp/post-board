const db = require('../db');

const postIDExists = async postID => {
	const exists = await db.one(
		'SELECT EXISTS(SELECT 1 FROM posts WHERE id=$1)',
		[postID]
	);
	return exists;
};

module.exports = { postIDExists };
