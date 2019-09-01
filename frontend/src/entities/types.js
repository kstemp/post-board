//@flow
export type Comment = {
	ID: string,
	parentID: string | null,
	text: string
};

export type Post = {
	ID: string,
	text: string,
	comments: Comment[]
};
