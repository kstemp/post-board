var express = require('express');
var router = express.Router();

let TEMP_POSTS = [
	{
		ID: 'a',
		text: 'test1',
		comments: [
			{
				ID: '12',
				text: 'hejka!'
			},
			{
				ID: '13',
				text: 'im a child'
			}
		]
	},
	{ ID: 'b', text: 'test2', comments: [] }
];

router.get('/', (req, res) => {
	return res.status(200).send(TEMP_POSTS);
});

router.post('/', (req, res) => {
	//TODO check if post text is not empty,
	//TODO and not composes only from spaces
	TEMP_POSTS.push({
		text: req.body.text,
		ID: 69,
		comments: []
	});

	return res.sendStatus(200);
});

router.post('/:ID/comments', (req, res) => {
	//	console.log('hello there!');
	//TODO check whether post ID exists
	// TODO check whether req body is valid, ID is nonempty etc.
	TEMP_POSTS.find(post => post.ID === req.params.ID).comments.push({
		text: req.body.text
	});
	//	console.log(TEMP_POSTS[0].comments);
	return res.sendStatus(200);
});

module.exports = router;
