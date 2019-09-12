const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const string = require('./util/string');
const keycloak = require('./keycloak');
const app = express();
const db = require('./db');
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
					return res.sendStatus(500);
				});
		});
	}
);
/*
let accessToken;
let refreshToken;
*/
/*
keycloak
	.isTokenActive(
		'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRUmNHbTRpaGRiSFl4dmRpSkFBWVBjVkFnX2ZwZjlFZVRIMXlDNy1Pd1Q0In0.eyJqdGkiOiJiYTAzZGJlOS02OTgwLTRhN2UtOGY2Yy1lM2U4NGM2Yzc4NmEiLCJleHAiOjE1NjgzMDI4MjcsIm5iZiI6MCwiaWF0IjoxNTY4MzAyNTI3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvcG9zdCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxNmUzNmNhYS1lM2U2LTQ0Y2ItOGZiNi1mMmNmMGM0MDg3YTIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJwb3N0LWZyb250ZW5kIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiYzg1NWZkZjMtNjA1ZC00YzA5LTg0YTItNTQxNDRiZTkyZTFlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJqdWxpYSJ9.RwYSxtrA_6FaDdI3Lq2mE6CKmiwvDsFyOHhkPgKLGxo7hywhop5_9vVVUFAynT_cvVuBXa05hkRt-Gg-vya8AYxrTUC6WcvwZWVr9zRXg7PyJ9fi_W2b06bWkYOkhDTBWei4f1xiJ9X1OgOsWNHLl9Zl5mQdERSlcgCKQZsjJOy9YMMVLJySwysvkneJnYUrcvj2AbrCwqADPocgWUw0Hx3stCbPmCqw-IkByFLLubmX7cAemD5MxIxpnW0FEtOayKDSlWTTW169RHt4KRPDcLr2imWJCZYs9UtolbpHvTtaC-Q8ZujTepBccP1BqOgR1YRvuXDmNscWlfSk8LMdww'
	)
	.then(isActive => console.log('ACTIVE: ', isActive))
	.catch(err => console.log(err));
*/
app.listen(8000, () => console.log(`\nbackend is running\n`));
