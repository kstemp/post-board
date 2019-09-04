const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("backend is running");
});

app.listen(8000, () => console.log(`\nbackend is running\n`));
