import express, { Request, Response } from 'express';
import db, { execSQLQuery, PSQLERR } from '../modules/db';
import { check, query, sanitize } from 'express-validator';
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
			if (e.code === PSQLERR.UNIQUE_VIOLATION) {
				return res.sendStatus(400);
			}
			console.log(e);
			return res.sendStatus(500);
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

// TODO validation
router.get('/:id/new', async (req: Request, res: Response) => {
	try {
		const data = await db.oneOrNone(
			"SELECT ARRAY(SELECT entity_id FROM entities WHERE type='post' AND parent_board_id = $1 ORDER BY created_on DESC OFFSET $2 LIMIT 5) AS entity_ids",
			[req.params['id'], req.query.offset || 0]
		);

		return res.status(200).send(data);
	} catch (e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

router.post(
	'/:id/',
	[
		sanitize('text').trim(),
		check('text')
			.not()
			.isEmpty(),
		check('text').isLength({ max: 1200 })
	],
	checkValidation,
	verifyToken(false),
	async (req: Request, res: Response) => {
		try {
			const post = await db.func('create_post', [
				req.params['id'],
				req.body['text'],
				(req as any)['userID']
			]);

			return res.status(200).send(post);
		} catch (error) {
			if (error.code === PSQLERR.FOREIGN_KEY_VIOLATION) {
				return res.sendStatus(400);
			}
			return res.sendStatus(500);
		}
	}
);
module.exports = router;
