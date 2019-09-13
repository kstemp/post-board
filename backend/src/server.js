const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const string = require('./util/string');
const keycloak = require('./keycloak');
const app = express();
const db = require('./db');
const config = require('./config.js');
const { check, validationResult } = require('express-validator');

/* UN-FUCK CORS */
app.use(cors());
//app.options('*', cors());

const community = require('./routes/community');
const post = require('./routes/post');

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).send('backend is running');
});

app.use('/community', community);

app.use('/post', post);

const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

const hashPassword = plaintextPassword =>
	new Promise(resolve =>
		bcrypt
			.genSalt(SALT_ROUNDS)
			.then(salt =>
				bcrypt
					.hash(plaintextPassword, salt)
					.then(password => resolve(password))
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
	(req, res) => {
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
					const token = jwt.sign(req.body.login, config.SECRET);
					return res.status(200).send(token);
				});
		})
		.catch(error => {
			console.log(error);
			return res.sendStatus(500);
		}); // TODO not good - this will also happen when there's no user of this name, but then it's 400(?)
});

app.listen(8000, () => console.log(`\nbackend is running\n`));
