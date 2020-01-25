var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    inline: true,
    port: 8000,
    contentBase: 'src',
    hot: true,
    open: true,
  },
}
