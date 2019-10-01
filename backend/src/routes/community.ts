import express, { Request, Response } from 'express';
import { execSQLQuery } from '../modules/db';
import { check, query } from 'express-validator';
import { checkValidation } from '../modules/validator';
import verifyToken from '../modules/verify-token';

const router = express.Router();

// TODO use func for function execution
const verifyCommunityID = [
	check('communityID', 'Community ID must be an integer').isInt({ min: 1 })
];

router.get(
	'/:communityID',
	verifyCommunityID,
	checkValidation,
	(req: Request, res: Response) =>
		execSQLQuery(
			req,
			res,
			'SELECT name FROM communities WHERE community_id = $1',
			[req.params.communityID]
		)
);

// TODO db.any? none?
router.post(
	'/:communityID/follow',
	verifyCommunityID,
	checkValidation,
	verifyToken(true),
	(req: Request, res: Response) =>
		execSQLQuery(
			req,
			res,
			'SELECT follow_community($1, $2)',
			[req.params.communityID, (req as any).userID],
			true
		)
);

// TODO should we return OK even if nothing was deleted, because the user never followed community?
router.post(
	'/:communityID/unfollow',
	verifyCommunityID,
	checkValidation,
	verifyToken(true),
	(req: Request, res: Response) =>
		execSQLQuery(
			req,
			res,
			'SELECT unfollow_community($1, $2)',
			[req.params.communityID, (req as any).userID],
			true
		)
);

module.exports = router;
