const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // or 'development'
  entry: './src/index.js', // Your main JavaScript file
  output: {
    filename: 'bundle.min.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};