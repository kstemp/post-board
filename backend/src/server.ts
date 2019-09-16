import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import verifyToken from './modules/verify-token';

const app = express();

/* UN-FUCK CORS */
app.use(cors());

app.use(bodyParser.json());

const community = require('./routes/community');
app.use('/community', community);

const post = require('./routes/post');
app.use('/post', post);

const session = require('./routes/session');
app.use('/session', session);

const reactions = require('./routes/reactions');
app.use('/reactions', reactions);

app.get('/', (req: express.Request, res: express.Response) => {
	res.status(200).send('backend is running');
});

app.listen(8000, () => console.log(`\nbackend is running\n`));
