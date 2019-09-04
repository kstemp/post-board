let TEMP_POSTS = [
	{
		text: 'test1',
		comments: [
			{
				ID: 12,
				text: 'hejka!'
			},
			{
				ID: 13,
				text: 'im a child'
			}
		]
	},
	{ text: 'test2', comments: [] }
];

const get = (req, res) => {
	return res.status(200).send(TEMP_POSTS);
};

const post = (req, res) => {
	//TODO check if post text is not empty,
	//TODO and not composes only from spaces
	TEMP_POSTS.push({
		text: req.body.text,
		ID: 69,
		comments: []
	});

	return res.sendStatus(200);
};

module.exports = { get, post };
