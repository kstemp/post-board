import express from 'express';
import { query } from 'express-validator';
import verifyToken from '../modules/verify-token';
import db, { PSQLERR, execSQLQuery } from '../modules/db';
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
			'INSERT INTO reactions (parent_entity_id, login) VALUES ($1, $2)',
			[req.query.entityID, (req as any).login],
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
			'DELETE FROM reactions WHERE reactions.parent_entity_id = $1 AND reactions.login = $2',
			[req.query.entityID, (req as any).login],
			true
		)
);

module.exports = router;
