const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cwd = process.cwd();


module.exports = {
  mode: 'development',
  entry: ['./src/main.tsx'],
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/static/',
    // path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   // clear dist
    //   cleanOnceBeforeBuildPatterns: [path.resolve(cwd, 'dist/**/*')],
    // }),
    ...require('./webpack.plugins'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: path.resolve(cwd, 'templates', 'index.html')
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: require('./webpack.aliases'),
  },
  stats: 'errors-warnings',
  devtool: 'cheap-module-source-map',
  // devServer: {
  //   open: true,
  // },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
};
