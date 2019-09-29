import express from 'express';
import { query } from 'express-validator';
import verifyToken from '../modules/verify-token';
import { execSQLQuery } from '../modules/db';
import { checkValidation } from '../modules/validator';

const router = express.Router();

router.post(
	'/',
	[query('entityID').isNumeric()],
	checkValidation,
	verifyToken(true),
	(req: express.Request, res: express.Response) =>
		execSQLQuery(
			req,
			res,
			'INSERT INTO reactions (parent_entity_id, user_id) VALUES ($1, $2)',
			[req.query.entityID, (req as any).userID],
			true
		)
);

router.delete(
	'/',
	[query('entityID').isNumeric()],
	checkValidation,
	verifyToken(true),
	(req: express.Request, res: express.Response) =>
		execSQLQuery(
			req,
			res,
			'DELETE FROM reactions WHERE reactions.parent_entity_id = $1 AND reactions.user_id = $2',
			[req.query.entityID, (req as any).userID],
			true
		)
);

module.exports = router;
