import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

/* UN-FUCK CORS */
app.use(cors());

app.use(bodyParser.json());

app.use('/community', require('./routes/community'));
app.use('/post', require('./routes/post'));
app.use('/session', require('./routes/session'));
app.use('/reactions', require('./routes/reactions'));

app.get('/', (req: express.Request, res: express.Response) => {
	res.status(200).send('backend is running');
});

app.listen(8000, () => console.log(`\nbackend is running\n`));
