import express, { Request, Response } from 'express';
import db from '../modules/db';
import { check } from 'express-validator';
import { checkValidation } from '../modules/validator';

const router = express.Router();

router.get(
	'/:communityID',
	[check('communityID', 'Community ID must be an integer').isInt()],
	checkValidation,
	(req: Request, res: Response) => {
		const reqCommunityID = parseInt(req.params.communityID);

		db.any('SELECT entity_id FROM posts WHERE parent_community_id = $1', [
			reqCommunityID
		])
			.then(data => res.status(200).send(data.map(obj => obj.entity_id)))
			.catch(error => {
				console.log(error);
				return res.sendStatus(500);
			});
	}
);

module.exports = router;
