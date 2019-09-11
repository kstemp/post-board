const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Keycloak = require('keycloak-connect');
const session = require('express-session');

const app = express();

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

app.use(
	session({
		secret: 'JennyNicholson',
		resave: false,
		saveUninitialized: true,
		store: memoryStore
	})
);

app.use(keycloak.middleware());

const community = require('./routes/community');
const post = require('./routes/post');

app.use(cors());
app.use(bodyParser.json());

app.get('/protected', keycloak.protect(), (req, res) => {
	res.status(200).send('notice me senpai uwu');
});

app.get('/unprotected', (req, res) => {
	res.status(200).send("let's have shrex");
});

app.get('/', (req, res) => {
	res.status(200).send('backend is running');
});

app.use('/community', community);

app.use('/post', post);

app.listen(8000, () => console.log(`\nbackend is running\n`));
