import {
	fetchEntityAndPlaceInStore,
	createEntity,
	fetchEntity
} from './entity';
import { IDType } from './types';

/*
export const fetchPostIDsForCommunityID = (
	communityID: IDType,
	callbackNotifyLoading?: (arg0: boolean) => void
) =>
	fetchEntityAndPlaceInStore(
		`/community/${communityID}`,
		'post',
		callbackNotifyLoading
	);*/

export const fetchPostIDsForCommunityID = (communityID: IDType) =>
	fetchEntity(`/community/${communityID}`);

export const fetchPostByID = (postID: IDType) => fetchEntity(`/post/${postID}`);

export const fetchMetadataForPostID = (postID: IDType) =>
	fetchEntity(`/post/${postID}/metadata`);

export const fetchCommentsForPostID = (postID: IDType) =>
	fetchEntity(`/post/${postID}/comments`);
/*
export const fetchCommentsForPostID = (
	postID: IDType,
	callbackNotifyLoading: (arg0: boolean) => void
) =>
	fetchEntityAndPlaceInStore(
		`/post/${postID}/comments`,
		'comment',
		callbackNotifyLoading,
		postID
	);*/

export const createPost = (postText: string, communityID: IDType) =>
	createEntity(`/post?communityID=${communityID}`, postText);

export const createCommentForPostID = (postID: IDType, commentText: string) =>
	createEntity(`/post/${postID}/comments`, commentText);
