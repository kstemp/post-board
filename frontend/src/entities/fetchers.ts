import { fetchEntity } from './entity';
import {
	IDType,
	TEntity,
	IEntityIDs,
	TContentSorting,
	IUser,
	TUserProfile,
	IBoard
} from './types';

/*
export const fetchPostIDsForBoardID = (
	boardID: string,
	offset: number,
	contentSorting: TContentSorting
) =>
	fetchEntity<IEntityIDs>(
		`/boards/${boardID}/${contentSorting}?offset=${offset}`
	);*/

export const fetchPostsForBoardID = (
	boardID: string,
	offset: number,
	contentSorting: TContentSorting
) =>
	fetchEntity<TEntity[]>(
		`/boards/${boardID}/${contentSorting}?offset=${offset}`
	);

export const fetchEntityByID = (id: IDType) =>
	fetchEntity<TEntity>(`/entities/${id}`);

export const fetchEntitiesByParentID = (id: IDType) =>
	fetchEntity<TEntity[]>(`/entities/${id}/children`);

// TODO overloads with any!
export const createPost = (data: string | File, board_id: string) => {
	if (typeof data === 'string') {
		fetchEntity(`/entities?parent_board_id=${board_id}`, 'POST', data, {
			'content-type': 'text/html'
		});
	} else {
		fetchEntity(`/entities?parent_board_id=${board_id}`, 'POST', data);
	}
};

export const createCommentForParentID = (parentID: IDType, text: string) =>
	fetchEntity<TEntity>(
		`/entities?parent_entity_id=${parentID}`,
		'POST',
		text,
		{ 'content-type': 'text/html' }
	);
/*
export const fetchMetadataForPostID = (postID: IDType) =>
	fetchEntity<IEntityMetadata>(`/post/${postID}?metadata_only=true`);
*/

export const fetchUser = (userID: IDType) =>
	fetchEntity<IUser>(`/users/${userID}`);

export const fetchUserProfile = (userID: IDType) =>
	fetchEntity<TUserProfile>(`/users/${userID}/profile`);

/* board-related */
export const createBoard = (id: string, title: string) =>
	fetchEntity(`/boards`, 'POST', JSON.stringify({ id: id, title: title }));

export const fetchBoardMetadata = (id: string) =>
	fetchEntity<IBoard>(`/boards/${id}`);

/*
export const createCommentForPostIDAndParentCommentID = (
	postID: IDType,
	parent_comment_id: IDType,
	commentText: string
) =>
	createEntity<TEntity>(
		`/post/${postID}/comments?parent_comment_id=${parent_comment_id}`,
		JSON.stringify({ text: commentText }),
		true
	);
*/
