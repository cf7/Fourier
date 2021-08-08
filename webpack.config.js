const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/client/index.html', // uses original html as template
  filename: 'index.html', // new index.html build
  inject: 'body' // where to insert <script src="index.html"></script> tag
});

module.exports = {
  mode: 'development',
  entry: __dirname + '/client/index.js', // what files should webpack transform?
  module: {
    rules: [ // what transformations should webpack perform? (called "loaders")
      {
        test: /\.js$/, // check files to transform with this rule
        exclude: /node_modules/, // don't transform node_modules files
        use: 'babel-loader' // loader to apply, use the jsx parsing that comes with babel
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ]
      }
    ]
  },
  output: {
    filename: 'main.js', // output new build file
    path: __dirname + '/build' // build files are just bundles transformed by webpack loaders
  },
  plugins: [HTMLWebpackPluginConfig]
};