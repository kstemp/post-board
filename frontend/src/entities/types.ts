export type IDType = number;

export type EntityTypeEnum = 'post' | 'comment';

export interface IUser {
	name: string;
}

export type TUserProfile = IUser & {
	bio: string;
};

export interface ITokenPayload {
	token: string;
}

export interface IBoard {
	id: string;
	name: string;
	description: string;
	subscribed_users: number;
	created_on: string;
}

export type TEntityContent = 'html' | 'file';

export interface IEntityIDs {
	entity_ids: IDType[];
}

// NOTE we use snake_case here since this is how entries are stored in the PostgreSQL database
type IEntityBase = {
	entity_id: IDType;
	parent_entity_id?: IDType;

	created_on: string;

	user_id: IDType;

	content_type: TEntityContent;
	content: string;
};

export interface IEntityMetadata {
	child_count: number;
	reaction_count: number;
	reacted: boolean;
}

export type TEntity = IEntityBase & IEntityMetadata;

export type TContentSorting = 'new' | 'top';
