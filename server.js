const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const logger = require('morgan');

const routes = require('./client/api/routes.js');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/translation', (req, res) => { res.send("translated"); });

app.post('/translate', (req, res) => {
  res.sendStatus(200); 
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Listening on port 3000!\n');
});