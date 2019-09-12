const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const string = require('./util/string');
const keycloak = require('./keycloak');
const app = express();

/* UN-FUCK CORS */
app.use(cors());
//app.options('*', cors());

const community = require('./routes/community');
const post = require('./routes/post');

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).send('backend is running');
});

app.post('/login', (req, res) => {
	if (string.isEmpty(req.body.login)) {
		res.status(400).send("Field 'login' not found in the request body");
	}

	if (string.isEmpty(req.body.password)) {
		res.status(400).send("Field 'password' not found in the request body");
	}

	console.log('login = ', req.body.login, ', password = ', req.body.password);

	keycloak
		.login(req.body.login, req.body.password)
		.then(credentials => {
			console.log('CREDENTIALS: ', credentials);
			return res.status(200).send(credentials);
		})
		.catch(error => {
			console.log('ERROR: ', error);
			return res.status(error.status).send(error);
		});
});

app.use('/community', community);

app.use('/post', post);

app.listen(8000, () => console.log(`\nbackend is running\n`));
