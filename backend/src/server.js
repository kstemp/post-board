const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Keycloak = require('keycloak-connect');
const session = require('express-session');
const fetch = require('node-fetch');
const app = express();

/* UN-FUCK CORS */
app.use(cors());
app.options('*', cors());

const keycloakLogin = (login, password) => {
	const body = new URLSearchParams();
	body.append('username', login);
	body.append('password', password);
	body.append('grant_type', 'password');
	body.append('client_id', 'post-backend');
	body.append('client_secret', '8c34563c-ccd8-4421-ba55-080c62ca0589');

	const fetchParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	};

	console.log(fetchParams);

	fetch(
		`http://localhost:8080/auth/realms/post/protocol/openid-connect/token`,
		fetchParams
	)
		.then(response => {
			if (!response.ok) {
				throw response;
			}
			return response.json();
		})
		.then(json => {
			return console.log(json);
		})
		.catch(error => console.log(error));
};

keycloakLogin('julia', 'julia');

const community = require('./routes/community');
const post = require('./routes/post');

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).send('backend is running');
});

app.use('/community', community);

app.use('/post', post);

app.listen(8000, () => console.log(`\nbackend is running\n`));
