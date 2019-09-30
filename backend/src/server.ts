import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

/* UN-FUCK CORS */
app.use(cors());
app.use(bodyParser.json());

app.use('/community', require('./routes/community'));
app.use('/post', require('./routes/post'));
app.use('/users', require('./routes/users'));
app.use('/reactions', require('./routes/reactions'));
app.use('/boards', require('./routes/boards'));

app.get('/', (req, res) => res.sendStatus(204));

app.listen(8000, () => console.log(`\nbackend is running\n`));

// for testing
module.exports = app;
