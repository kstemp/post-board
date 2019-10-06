import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import verifyToken from './modules/verify-token';

const app = express();

/* UN-FUCK CORS */
app.use(cors());
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.raw({ limit: '50mb', type: 'image/jpeg' }));
app.use(bodyParser.json());

app.use('/users', require('./routes/users'));
app.use('/reactions', verifyToken(true), require('./routes/reactions'));
app.use('/boards', require('./routes/boards'));
app.use('/entities', require('./routes/entities'));

app.use('/img', express.static('img'));

app.get('/', (req, res) => res.sendStatus(200));

app.listen(8000, () => console.log(`\nbackend is running\n`));

// for testing
module.exports = app;
