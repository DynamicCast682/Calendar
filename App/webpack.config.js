



const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// scss react typescript webpack config file for development
module.exports = {
  // mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static')
  },
  // resolve: {
  //   extensions: ['.ts', '.tsx', '.js', '.jsx']
  // },
  module: {
    // rules: [
    //   {
    //     test: /\.css$/i,
    //     use: [MiniCssExtractPlugin.loader, "css-loader"],
    //   },
    // ],
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 9000
  // }
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ]
};