export type IDType = number;

export type CommentType = {
	id: IDType;
	post_id: number;
	text: string;
};

export type CommunityType = {
	id: IDType;
	name: string;
};

export type PostType = {
	id: IDType;
	text: string;
	community_id: IDType;
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
