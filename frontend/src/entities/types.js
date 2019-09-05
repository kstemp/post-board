//@flow
export type Comment = {
	id: number,
	parentPostID: number,
	text: string
};

export type Post = {
	id: number,
	text: string,
	comments: Comment[]
};
