const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        options: {
          transpileOnly: true,
          configFile: 'tsconfig.json',
        },
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   chunks: ['main'],
    //   template: resolve(__dirname, 'public/index.html'),
    //   favicon: resolve(__dirname, 'public/content/images/favicon.ico'),
    // }),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: "./build",
    compress: true,
    port: 3001
  }
};