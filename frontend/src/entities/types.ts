export type IDType = number;

export type CommentType = {
	id: IDType;
	postID: number;
	text: string;
};

export type PostType = {
	id: IDType;
	text: string;
};

export type ReducerStateType = {
	posts: PostType[];
	comments: { [id: number]: CommentType[] };
};
