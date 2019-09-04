const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const posts = require('./routes/posts');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).send('backend is running');
});

app.route('/posts')
	.get(posts.get)
	.post(posts.post);

app.listen(8000, () => console.log(`\nbackend is running\n`));
