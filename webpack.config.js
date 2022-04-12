const path = require('path');
console.log("WEBPACK OVERRIDE WAS LOADED");
module.exports = {
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient'
    }
  },
  module: {
    rules: [
      {
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
      },
    ]
  }
}