import db from '../db';

export const postIDExists = async (postID: string) => {
	const exists = await db.one(
		'SELECT EXISTS(SELECT 1 FROM posts WHERE id=$1)',
		[postID]
	);
	return exists;
};
