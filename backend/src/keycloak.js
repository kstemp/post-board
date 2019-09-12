const fetch = require('node-fetch');

const CLIENT_SECRET = '8c34563c-ccd8-4421-ba55-080c62ca0589';
const CLIENT_NAME = 'post-backend';

const KEYCLOAK_URL = 'http://localhost:8080/auth';

const login = (login, password) => {
	const body = new URLSearchParams();
	body.append('username', login);
	body.append('password', password);
	body.append('grant_type', 'password');
	body.append('client_id', CLIENT_NAME);
	body.append('client_secret', CLIENT_SECRET);

	const fetchParams = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	};

	return new Promise((resolve, reject) => {
		fetch(
			`${KEYCLOAK_URL}/realms/post/protocol/openid-connect/token`,
			fetchParams
		)
			.then(response => {
				if (!response.ok) {
					throw response;
				}
				return response.json();
			})
			.then(json => resolve(json))
			.catch(error => reject(error));
	});
};

module.exports = { login };
