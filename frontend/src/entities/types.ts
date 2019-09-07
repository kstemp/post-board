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

export type EntityTypeEnum = 'community' | 'post' | 'comment';

export type SetEntitiesActionDataType = {
	entityType: EntityTypeEnum;
	parentID?: IDType;
	entities: CommunityType | PostType | CommentType;
};

export type ReducerStateType = {
	post: PostType[];
	comment: { [postID: number]: CommentType[] };
	community: CommunityType[];
};
