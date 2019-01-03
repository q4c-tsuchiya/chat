const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env', 'react']
            }
        } 
      },
      { 
        test: /\.css$/,
        loaders: ['style-loader','css-loader?modules']
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.css'],
  },
};
