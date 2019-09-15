export type IDType = number;

export type EntityTypeEnum = 'post' | 'comment';

// TODO refactor, we could have interface IEntity and some others derived from this one
// NOTE we use snake_case here since this is how entries are stored in the PostgreSQL database
export type CommentType = {
	entity_id: IDType;
	parent_post_id: number;
	text: string;
	created_on: string;
	login: string;
};

export type CommunityType = {
	id: IDType;
	name: string;
};

export type PostType = {
	entity_id: IDType;
	text: string;
	parent_community_id?: IDType;
	created_on: string;
	login: string;
};
