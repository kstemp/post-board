const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const community = require('./routes/community');
const post = require('./routes/post');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).send('backend is running');
});

app.use('/community', community);

app.use('/post', post);

app.listen(8000, () => console.log(`\nbackend is running\n`));
