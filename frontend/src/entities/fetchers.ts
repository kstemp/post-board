import { fetchEntity } from './entity';
import {
	IDType,
	TEntity,
	TContentSorting,
	IUser,
	TUserProfile,
	IBoard
} from './types';

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

export const deleteEntityByID = (id: IDType) =>
	fetchEntity(`/entities/${id}`, 'DELETE', {}, {}, false);

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

export const fetchUser = (userID: IDType) =>
	fetchEntity<IUser>(`/users/${userID}`);

export const fetchUserProfile = (userID: IDType) =>
	fetchEntity<TUserProfile>(`/users/${userID}/profile`);

/* board-related */
export const createBoard = (id: string, title: string) =>
	fetchEntity(`/boards`, 'POST', JSON.stringify({ id: id, title: title }), { 'content-type': 'application/json' });

export const fetchBoardMetadata = (id: string) =>
	fetchEntity<IBoard>(`/boards/${id}`);
