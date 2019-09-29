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
		check('password').isLength({ min: 8 })
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
				'INSERT INTO nonactive_users (email, password, email_hash) VALUES ($1, $2, $3)',
				[req.body.email, hashedPassword, emailHash]
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
				'SELECT email, password FROM nonactive_users WHERE email=$1 AND email_hash=$2',
				[req.query['email'], req.query['email_hash']]
			);

			await db.none(
				'INSERT INTO users (email, password) VALUES ($1, $2)',
				[data['email'], data['password']]
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

module.exports = router;
