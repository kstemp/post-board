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

			await db.none(
				'DELETE FROM nonactive_users WHERE email=$1 AND email_hash=$2',
				[req.query['email'], req.query['email_hash']]
			);

			return res.sendStatus(200);
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

router.post(
	'/login',
	[
		check('login', 'Login does not exist').custom(login =>
			checkLoginExists(login)
				.then(exists => (exists ? Promise.resolve() : Promise.reject()))
				.catch(err => Promise.reject())
		)
	],
	checkValidation,
	(req: express.Request, res: express.Response) => {
		db.one('SELECT * FROM users WHERE login=$1', [req.body.login])
			.then(data => {
				console.log('Hashed password: ', data.password);
				return bcrypt
					.compare(req.body.password, data.password)
					.then(correct => {
						if (!correct) {
							return res.sendStatus(403);
						}
						const token = jwt.sign(
							{ login: req.body.login },
							SECRET,
							{
								expiresIn: 600
							}
						);
						return res.status(200).send({
							token: token
						});
					})
					.catch(err => {
						return console.log(err); // TODO can bcrypt fail here?
					});
			})
			.catch(error => {
				console.log(error);
				return res.sendStatus(500);
			});
	}
);

module.exports = router;
