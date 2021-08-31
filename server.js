const express = require('express');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');

// express uses middleware to process req and res objects
const logger = require('morgan');
const path = require('path'); // for cross-platform compatibility

const routes = require('./client/api/routes.js');

const app = express();
// const config = require('./webpack.config.js');
// const compiler = webpack(config);

// ** using webpack middleware in express only allows app to bundle in-memory server-side
// webpack changes __dirname value

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(
//   webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath
//   })
// );

// middleware order matters
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '/build'))); // serve these files

app.get('/translation', (req, res) => { res.send("translated"); });

app.post('/translate', (req, res) => {
  res.sendStatus(200);
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/about.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Listening on port 3000!\n');
});