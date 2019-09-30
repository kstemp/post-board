import express from 'express';
import bcrypt from 'bcryptjs';
import { SECRET } from '../modules/secret';
import { check, query } from 'express-validator';
import db, { PSQLERR } from '../modules/db';
import { checkLoginExists, checkValidation } from '../modules/validator';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import { queryResult, errors } from 'pg-promise';
import { resolveSoa } from 'dns';
import verifyToken from '../modules/verify-token';

const router = express.Router();

const SALT_ROUNDS = 12;
const RANGE_MIN = 1;
const RANGE_MAX = 10000;
const MD5_LENGTH = 32;

const randomInRange = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

//TODO  password length!!!
router.post(
	'/register',
	[
		check('email')
			.isEmail()
			.custom(async emailToVerify => {
				try {
					const email = await db.oneOrNone(
						'SELECT email FROM users WHERE email=$1',
						[emailToVerify]
					);

					return email ? Promise.reject() : Promise.resolve();
				} catch (e) {
					console.log(e);
					return Promise.reject();
				}
			}),
		check('password').isLength({ min: 8 }),
		check('name').isLength({ min: 4, max: 256 })
	],
	checkValidation,
	async (req: express.Request, res: express.Response) => {
		try {
			const hashedPassword = await bcrypt.hash(
				req.body.password,
				SALT_ROUNDS
			);

			const emailHash = md5(
				randomInRange(RANGE_MIN, RANGE_MAX).toString()
			);

			await db.none(
				'INSERT INTO nonactive_users (email, password, email_hash, name) VALUES ($1, $2, $3, $4)',
				[req.body['email'], hashedPassword, emailHash, req.body['name']]
			);

			return res.sendStatus(200);
		} catch (e) {
			console.log(e);
			return res.sendStatus(500);
		}
	}
);

// TODO expiration!!!!
// we use 'get' here so that it works in browser
router.get(
	'/verifyEmail',
	[
		query('email').isEmail(),
		query('email_hash').isLength({ min: MD5_LENGTH, max: MD5_LENGTH })
	],
	checkValidation,
	async (req: express.Request, res: express.Response) => {
		try {
			const data = await db.one(
				'SELECT name, email, password FROM nonactive_users WHERE email=$1 AND email_hash=$2',
				[req.query['email'], req.query['email_hash']]
			);

			await db.none(
				'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
				[data['name'], data['email'], data['password']]
			);

			await db.none('DELETE FROM nonactive_users WHERE email=$1', [
				req.query['email']
			]);

			return res.redirect('http://localhost:3000/login');
		} catch (e) {
			if (e.code === errors.queryResultErrorCode.noData) {
				return res.sendStatus(400);
			}

			if (e.code === PSQLERR.UNIQUE_VIOLATION) {
				return res.sendStatus(400);
			}

			console.log(e);
			return res.sendStatus(500);
		}
	}
);

// TODO validation
router.post('/login', async (req: express.Request, res: express.Response) => {
	try {
		const data = await db.oneOrNone(
			'SELECT user_id, password FROM users WHERE email=$1',
			[req.body['email']]
		);

		console.log(data);

		if (!data) {
			return res.sendStatus(401);
		}

		const correct = await bcrypt.compare(
			req.body['password'],
			data['password']
		);

		if (!correct) {
			return res.sendStatus(401);
		}

		const token = jwt.sign({ userID: data['user_id'] }, SECRET, {
			expiresIn: 600
		});

		return res.status(200).send({
			token: token
		});
	} catch (e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

router.get('/:userID/', async (req, res) => {
	try {
		const data = await db.one('SELECT name FROM users WHERE user_id = $1', [
			req.params['userID']
		]);

		return res.status(200).send(data);
	} catch (e) {
		if (e.code === errors.queryResultErrorCode.noData) {
			return res.sendStatus(400);
		}
		console.log(e);
		return res.sendStatus(500);
	}
});

// TODO input validation
router.get('/:userID/profile', verifyToken(true), async (req, res) => {
	try {
		const data = await db.one(
			'SELECT * FROM user_data WHERE user_id = $1',
			[req.params['userID']]
		);

		return res.status(200).send(data);
	} catch (e) {
		if (e.code === errors.queryResultErrorCode.noData) {
			return res.sendStatus(404); // TODO consistency of error codes
		}
		console.log(e);
		return res.sendStatus(500);
	}
});

// TODO input validation
// params in body: bio as strin
// TODO table column as parameter
router.post('/:userID/profile/bio', verifyToken(true), async (req, res) => {
	try {
		if (parseInt(req.params['userID']) !== (req as any).userID) {
			return res.sendStatus(403);
		}

		await db.none(
			'INSERT INTO user_data (user_id, bio) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET bio = $2',
			[req.params['userID'], req.body['bio']]
		);

		return res.sendStatus(200);
	} catch (e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

module.exports = router;
