import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

/* UN-FUCK CORS */
app.use(cors());
app.use(bodyParser.json());

app.use('/users', require('./routes/users'));
app.use('/reactions', require('./routes/reactions'));
app.use('/boards', require('./routes/boards'));
app.use('/entities', require('./routes/entities'));

app.get('/', (req, res) => res.sendStatus(200));

app.listen(8000, () => console.log(`\nbackend is running\n`));

// for testing
module.exports = app;
