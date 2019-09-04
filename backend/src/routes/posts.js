const TEMP_POSTS = [
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

module.exports = { get };
