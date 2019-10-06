import express, { Request, Response } from 'express';
import db, { PSQLERR, getCodeFromError } from '../modules/db';
import { check, query, sanitize, oneOf, header, body } from 'express-validator';
import { checkValidation } from '../modules/validator';
import verifyToken from '../modules/verify-token';
import { errors } from 'pg-promise';
const router = express.Router();

// TODO use func for function execution
const verifyCommunityID = [
	check('communityID', 'Community ID must be an integer').isInt({ min: 1 })
];

router.get('/:id', async (req, res) => {
	try {
		const data = await db.one('SELECT * FROM boards WHERE id = $1', [
			req.params['id']
		]);
		return res.status(200).send(data);
	} catch (e) {
		if (e.code === errors.queryResultErrorCode.noData) {
			return res.sendStatus(404);
		}

		console.log(e);

		return res.sendStatus(500);
	}
});

router.post(
	'/',
	[
		check('id').isAlphanumeric(),
		check('title').isLength({ min: 2, max: 100 })
	],
	checkValidation,
	verifyToken(true),
	async (req: Request, res: Response) => {
		try {
			await db.none('INSERT INTO boards (id, title) VALUES ($1, $2)', [
				req.body['id'],
				req.body['title']
			]);
			return res.sendStatus(200);
		} catch (e) {
			console.log(e);
			return res.sendStatus(getCodeFromError(e));
		}
	}
);

/*
router.get(
	'/:id/top',
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
			"SELECT ARRAY(SELECT entity_id FROM entities WHERE type = 'post' AND parent_community_id = $1 ORDER BY reaction_count DESC, created_on DESC OFFSET $2 LIMIT 5) AS entity_ids",
			[req.params.communityID, req.query.offset || 0]
		)
);*/

/* did_user_react_to_entity_id($1, $2) AS reacted */
// TODO validation
router.get(
	'/:id/new',
	verifyToken(false),
	async (req: Request, res: Response) => {
		try {
			const data = await db.manyOrNone(
				'SELECT * FROM entities, did_user_react_to_entity_id(entities.entity_id, $3) AS reacted WHERE parent_board_id = $1 ORDER BY created_on DESC OFFSET $2 LIMIT 5',
				[
					req.params['id'],
					req.query.offset || 0,
					(req as any)['userID']
				]
			);

			return res.status(200).send(data);
		} catch (e) {
			console.log(e);
			return res.sendStatus(getCodeFromError(e));
		}
	}
);

/*
type='post' AND  */
module.exports = router;
