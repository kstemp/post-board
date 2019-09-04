//@flow
const initialState = {
	posts: [
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
	]
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
