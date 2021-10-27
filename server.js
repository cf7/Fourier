const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '/build'))); // serve these files

app.get('/about', (req, res) => {
  res.sendFile('/about.html');
});

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!\n`);
});