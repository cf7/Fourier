/* Server currently not stateless */

// webpack-dev-server already runs express server!
// this is for production only

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

// const jsTokens = require('js-tokens');

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


// plugin engine to these routes
// app.get('/translation', (req, res) => { 
//   res.send("translated"); 
// });
app.post('/translate', (req, res) => {
  res.send({
    status: 200,
    translation: "Function 'example' prints the string 'x' to the console."
  });
});

app.get('/about', (req, res) => {
  res.sendFile('/about.html');
});

app.get('/', (req, res) => {
  res.sendFile('/index.html');
});

// Heroku requires $PORT env variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!\n`);
});

/*
  Notes:
    -keras seq2seq for nlp code to text translation, maybe use RNN
*/