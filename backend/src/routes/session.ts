import express from 'express';
import bcrypt from 'bcryptjs';
import { SECRET } from '../config';
import { check, validationResult } from 'express-validator';
import db from '../db';
import { checkLoginExists } from './validator';
import { rejects } from 'assert';

const router = express.Router();

const SALT_ROUNDS = 10;

const hashPassword = (plaintextPassword: string) =>
	new Promise((resolve, reject) =>
		bcrypt
			.genSalt(SALT_ROUNDS)
			.then((salt: string) =>
				bcrypt
					.hash(plaintextPassword, salt)
					.then((password: string) => resolve(password))
					.catch(() => reject())
			)
			.catch(() => reject())
	);

//TODO check if user name is already present
router.post(
	'/register',
	[
		check(
			'login',
			'Login mu contain only alphanumeric characters'
		).isAlphanumeric(),
		check('login', 'Login must be unique').custom(async login => {
			const exists = await checkLoginExists(login);
			return exists ? Promise.reject() : Promise.resolve();
		}),
		check('email', 'Must be a valid e-mail address').isEmail(),
		check(
			'password',
			'Password must be at least 8 characters long'
		).isLength({ min: 8 })
	],
	async (req: express.Request, res: express.Response) => {
		const errors = await validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.sendStatus(422);
		}

		hashPassword(req.body.password)
			.then(hashedPassword => {
				db.none(
					'INSERT INTO users (login, email, password) VALUES ($1, $2, $3)',
					[req.body.login, req.body.email, hashedPassword]
				)
					.then(() => res.sendStatus(204))
					.catch(error => {
						console.log(error);
						return res.sendStatus(500); // Not good - duplicate user name is a PSQL error, but we should inform user about this
					});
			})
			.catch(error => res.sendStatus(500));
	}
);

const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
	console.log('Received password: ', req.body.password);

	db.one('SELECT * FROM users WHERE login=$1', [req.body.login])
		.then(data => {
			console.log('Hashed password: ', data.password);
			return bcrypt
				.compare(req.body.password, data.password)
				.then(correct => {
					if (!correct) {
						return res.sendStatus(403);
					}
					const token = jwt.sign(req.body.login, SECRET);
					return res.status(200).send({
						token: token
					});
				});
		})
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		}); // TODO not good - this will also happen when there's no user of this name, but then it's 400(?)
});

module.exports = router;
