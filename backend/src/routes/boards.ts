import express, { Request, Response } from 'express';
import db, { execSQLQuery, PSQLERR } from '../modules/db';
import { check, query } from 'express-validator';
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
		check('id')
			.not()
			.contains(' '),
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

module.exports = router;
