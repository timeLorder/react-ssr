const path = require('path')
const commons = require('./src/utils/commons.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  name: commons.title,
  mode: 'development',
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', ['@babel/preset-env']]
        }
      },
      {
        test: /\.css$/,
        use: ['isomorphic-style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.csr.html',
      template: 'src/index.csr.html'
    })
  ]
}