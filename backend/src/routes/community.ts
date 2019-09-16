import express, { Request, Response } from 'express';
import db from '../modules/db';

const router = express.Router();

router.get('/:communityID', (req: Request, res: Response) => {
	const reqCommunityID = parseInt(req.params.communityID);

	db.any('SELECT * FROM posts WHERE parent_community_id = $1', [
		reqCommunityID
	])
		.then(data => res.status(200).send(data))
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
});

module.exports = router;
