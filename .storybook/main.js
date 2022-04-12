const { config } = require("process");
const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    '@storybook/addon-react-native-web'
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.ttf$/,
            loader: "url-loader", // or directly file-loader
            include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
          }
        ]
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias, 
          'react-native$': 'react-native-web',
          'react-native-linear-gradient': 'react-native-web-linear-gradient'
        }
      },
    };
  }
}