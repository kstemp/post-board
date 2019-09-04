//@flow
export type Comment = {
	ID: string,
	parentPostID: string,
	text: string
};

export type Post = {
	ID: string,
	text: string,
	comments: Comment[]
};
