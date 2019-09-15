import express, { Request, Response } from 'express';
import db, { PSQLERR } from '../modules/db';
import { check, sanitize, validationResult } from 'express-validator';
import verifyToken from '../modules/verify-token';

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
