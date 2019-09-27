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

router.get(
	'/:communityID/top',
	[
		...verifyCommunityID,
		query('offset')
			.optional()
			.isInt({ min: 0 })
	],
	checkValidation,
	(req: Request, res: Response) =>
		execSQLQuery(
			req,
			res,
			'SELECT ARRAY(SELECT entity_id FROM posts WHERE parent_community_id = $1 ORDER BY get_reaction_count_for_entity_id(entity_id) DESC, created_on DESC OFFSET $2 LIMIT 5) AS entity_ids',
			[req.params.communityID, req.query.offset || 0]
		)
);

router.get(
	'/:communityID/new',
	[
		...verifyCommunityID,
		query('offset')
			.optional()
			.isInt({ min: 0 })
	],
	checkValidation,
	(req: Request, res: Response) =>
		execSQLQuery(
			req,
			res,
			'SELECT ARRAY(SELECT entity_id FROM posts WHERE parent_community_id = $1 ORDER BY created_on DESC OFFSET $2 LIMIT 5) AS entity_ids',
			[req.params.communityID, req.query.offset || 0]
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
			[req.params.communityID, (req as any).login],
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
			[req.params.communityID, (req as any).login],
			true
		)
);

module.exports = router;
