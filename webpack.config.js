const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, '/client/index.js'),
    about: path.resolve(__dirname, '/client/about.js')
  }, // what files should webpack transform?
  module: {
    rules: [ // what transformations should webpack perform? (called "loaders")
      {
        test: /\.js$/, // check which files to transform with this rule
        exclude: /node_modules/, // don't transform node_modules files
        use: 'babel-loader' // apply this loader, use the jsx parsing that comes with babel
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [ "style-loader", "css-loader", "sass-loader" ] // * order matters! (right-to-left!)
      } // compiles SASS -> to CSS -> compiles CSS -> style-loader inlines CSS into html
    ]
  },
  output: {
    filename: '[name].bundle.js', // output new build file, [name] uses chunk names
    path: path.resolve(__dirname, '/build'), // build files are just bundles transformed by webpack loaders
    publicPath: '/', // renames [path] property in this object to shorter '/'
    clean: true
  },
  plugins: [ // need a new plugin instance for each entry point
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '/client/template.html'), // uses original html as template
      filename: 'index.html', // new index.html build
      chunks: ['index'], // which entries to inject?
      inject: 'body', // where to insert <script src="index.html"></script> tag
      title: 'Fourier'
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '/client/template.html'),
      filename: 'about.html',
      chunks: ['about'],
      inject: 'body',
      title: 'Fourier'
    })
  ],
  optimization: {
    runtimeChunk: 'single' // must use this option when sharing modules in codesplitting
  },
  devtool: 'inline-source-map', // error-tracking so error not erased by bundle.js
  watch: true
};