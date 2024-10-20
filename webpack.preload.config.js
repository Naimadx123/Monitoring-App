import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/preload/preload.ts',
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
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.cjs'],
  },
  output: {
    filename: 'preload.cjs',
    path: path.resolve("build/preload"),
  },
  devtool: 'source-map',
};
