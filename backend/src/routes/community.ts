import express, { Request, Response } from 'express';
import db, { PSQLERR } from '../modules/db';
import { check, query } from 'express-validator';
import { checkValidation } from '../modules/validator';
import { errors } from 'pg-promise';
import verifyToken from '../modules/verify-token';

const router = express.Router();

const verifyCommunityID = [
	check('communityID', 'Community ID must be an integer').isInt({ min: 1 })
];

const execSQLQuery = (query: string, ) => {
	
}

router.get(
	'/:communityID',
	verifyCommunityID,
	checkValidation,
	(req: Request, res: Response) => {
		db.one(
			'SELECT name FROM communities WHERE community_id = $1',
			req.params.communityID
		)
			.then(data => res.status(200).send(data))
			.catch(err => {
				console.log(err);
				// TODO better error checks
				if (err.code === errors.queryResultErrorCode.noData) {
					return res.sendStatus(404);
				}

				return res.sendStatus(500);
			});
	}
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
		db
			.any(
				'SELECT entity_id FROM posts WHERE parent_community_id = $1 ORDER BY get_reaction_count_for_entity_id(entity_id) DESC, created_on DESC OFFSET $2 LIMIT 5',
				[req.params.communityID, req.query.offset || 0]
			)
			.then(data => res.status(200).send(data.map(obj => obj.entity_id)))
			.catch(error => {
				console.log(error);
				return res.sendStatus(500);
			})
);

// TODO db.any? none?
router.post(
	'/:communityID/follow',
	verifyCommunityID,
	checkValidation,
	verifyToken(true),
	(req: Request, res: Response) =>
		db
			.any('SELECT follow_community($1, $2)', [
				req.params.communityID,
				(req as any).login
			])
			.then(() => res.sendStatus(204))
			.catch(err => {
				console.log(err);
				if (err.code === PSQLERR.UNIQUE_VIOLATION) {
					return res.sendStatus(400);
				}
				return res.sendStatus(500);
			})
);

// TODO should we return OK even if nothing was deleted, because the user never followed community?
router.post(
	'/:communityID/unfollow',
	verifyCommunityID,
	checkValidation,
	verifyToken(true),
	(req: Request, res: Response) =>
		db
			.any('SELECT unfollow_community($1, $2)', [
				req.params.communityID,
				(req as any).login
			])
			.then(() => res.sendStatus(204))
			.catch(err => {
				console.log(err);
				return res.sendStatus(500);
			})
);

module.exports = router;
