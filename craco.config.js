const path = require('path');
console.log("Loaded Webpack overrides");
module.exports = {
  babel: {
    presets: ["@babel/preset-env", "@babel/preset-react"]
  },
  webpack: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient'
    },
  }
}