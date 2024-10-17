import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/renderer/index.tsx',
  target: 'electron-renderer',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve("build/copy"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'build/copy/index.html',
    }),
  ],
  devtool: 'source-map',
};
