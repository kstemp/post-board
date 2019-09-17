import express, { Request, Response } from 'express';
import db from '../modules/db';

const router = express.Router();

router.get('/:communityID', (req: Request, res: Response) => {
	const reqCommunityID = parseInt(req.params.communityID);

	db.any('SELECT entity_id FROM posts WHERE parent_community_id = $1', [
		reqCommunityID
	])
		.then(data => {
			const formatted = data.map(obj => obj.entity_id);
			console.log(formatted);
			res.status(200).send(formatted);
		})
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		});
});

module.exports = router;
