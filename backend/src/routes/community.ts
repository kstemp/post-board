import express, { Request, Response } from 'express';
import db from '../modules/db';
import { check, query } from 'express-validator';
import { checkValidation } from '../modules/validator';
import { queryResult, errors } from 'pg-promise';

const router = express.Router();

//router.use('/:communityID', )

router.get(
	'/:communityID',
	[check('communityID', 'Community ID must be an integer').isInt({ min: 0 })], // TODO add min 0 to other checks, or bring the check to one place
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
		check('communityID', 'Community ID must be an integer').isInt(),
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

module.exports = router;
