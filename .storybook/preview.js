// Generate required css
const iconFont = require('../src/fonts/cryptofont.ttf');
const materialCommunityIcons = require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')
const OcticonsIcons = require('react-native-vector-icons/Fonts/Octicons.ttf')

const iconFontStyles = `
@font-face {
  src: url(${iconFont});
  font-family: CryptoFont;
}
@font-face {
  src: url(${materialCommunityIcons});
  font-family: MaterialCommunityIcons;
}
@font-face {
  src: url(${OcticonsIcons});
  font-family: Octicons;
}
`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

import tw, { useDeviceContext } from 'twrnc';

export const decorators = [
  (Story) => {
    useDeviceContext(tw);
    return (
      <Story/>
    );
  },
];