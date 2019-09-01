//@flow
const initialState = {
	posts: [
		{
			text: 'test1',
			comments: [
				{
					ID: 12,
					parentID: null,
					text: 'hejka!'
				},
				{
					ID: 13,
					parentID: 12,
					text: 'im a child'
				},
				{
					parentID: 13,
					text: 'im a child of a child'
				},
				{
					ID: 69,
					parentID: null,
					text: 'another top-level comment'
				},
				{
					ID: 12222,
					parentID: 69,
					text: 'im a child'
				}
			]
		},
		{ text: 'test2' }
	]
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
