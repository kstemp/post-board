import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';
import bcrypt from 'bcryptjs';
import { SECRET } from './config';

const app = express();

const { check, validationResult } = require('express-validator');

/* UN-FUCK CORS */
app.use(cors());

const community = require('./routes/community');
const post = require('./routes/post');

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).send('backend is running');
});

app.use('/community', community);

app.use('/post', post);

const SALT_ROUNDS = 10;

const hashPassword = (plaintextPassword: string) =>
	new Promise(resolve =>
		bcrypt
			.genSalt(SALT_ROUNDS)
			.then((salt: string) =>
				bcrypt
					.hash(plaintextPassword, salt)
					.then((password: string) => resolve(password))
			)
	);

//TODO check if user name is already present
app.post(
	'/register',
	[
		check('login').isAlphanumeric(),
		check('email').isEmail(),
		check('password').isLength({ min: 8 })
	],
	(req: express.Request, res: express.Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.sendStatus(400);
		}

		hashPassword(req.body.password).then(hashedPassword => {
			db.none(
				'INSERT INTO users (login, email, password) VALUES ($1, $2, $3)',
				[req.body.login, req.body.email, hashedPassword]
			)
				.then(() => res.sendStatus(204))
				.catch(error => {
					console.log(error);
					return res.sendStatus(500); // Not good - duplicate user name is a PSQL error, but we should inform user about this
				});
		});
	}
);

const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
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

app.listen(8000, () => console.log(`\nbackend is running\n`));
