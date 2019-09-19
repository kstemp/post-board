import express, { Request, Response } from 'express';
import db from '../modules/db';
import { check, query } from 'express-validator';
import { checkValidation } from '../modules/validator';

const router = express.Router();

router.get(
	'/:communityID',
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
				'SELECT entity_id FROM posts WHERE parent_community_id = $1 ORDER BY get_reaction_count_for_entity_id(entity_id) DESC OFFSET $2 LIMIT 5',
				[req.params.communityID, req.query.offset || 0]
			)
			.then(data => res.status(200).send(data.map(obj => obj.entity_id)))
			.catch(error => {
				console.log(error);
				return res.sendStatus(500);
			})
);

module.exports = router;
