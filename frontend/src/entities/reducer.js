//@flow
const initialState = {
	posts: [{ text: 'test1' }, { text: 'test2' }]
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
