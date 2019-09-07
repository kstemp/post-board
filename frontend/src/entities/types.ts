export type IDType = number;

export type CommentType = {
	id: IDType;
	postID: number;
	text: string;
};

export type CommunityType = {
	id: IDType;
	name: string;
};

export type PostType = {
	id: IDType;
	text: string;
};

export type ReducerStateType = {
	posts: PostType[];
	comments: { [id: number]: CommentType[] };
	communities: CommunityType[];
};
