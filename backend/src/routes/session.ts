import express from 'express';
import bcrypt from 'bcryptjs';
import { SECRET } from '../config';
import { check, validationResult } from 'express-validator';
import db from '../db';
import { checkLoginExists, formatValidationResults } from '../validator';
import jwt from 'jsonwebtoken';

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

//TODO check if email is in use
router.post(
	'/register',
	[
		check(
			'login',
			'Login must contain only alphanumeric characters'
		).isAlphanumeric(),
		check('login', 'User with this login already exists').custom(login =>
			checkLoginExists(login)
				.then(exists => (exists ? Promise.reject() : Promise.resolve()))
				.catch(err => Promise.reject())
		),
		check('email', 'Must be a valid e-mail address').isEmail(),
		check(
			'password',
			'Password must be at least 8 characters long'
		).isLength({ min: 8 })
	],
	(req: express.Request, res: express.Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).send(formatValidationResults(errors));
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
						return res.sendStatus(500);
					});
			})
			.catch(error => res.sendStatus(500));
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
	(req: express.Request, res: express.Response) => {
		console.log('Received password: ', req.body.password);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).send(formatValidationResults(errors));
		}

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
								expiresIn: 60
							}
						);
						return res.status(200).send({
							token: token
						});
					})
					.catch(err => {
						return console.log(err);
					});
			})
			.catch(error => {
				console.log(error);
				return res.sendStatus(500);
			});
	}
);

// TODO error handling
router.get('/verifyToken', (req, res) => {
	'Bearer ';
	const token = (req.headers.authorization as any).slice(7);
	console.log(token);

	jwt.verify(
		token,
		SECRET,
		(err: jwt.VerifyErrors, decoded: object | string) => {
			if (err) {
				res.sendStatus(403);
			}

			console.log(decoded);

			res.sendStatus(204);
		}
	);
});

module.exports = router;
