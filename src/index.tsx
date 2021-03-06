import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
if ((style as any).styleSheet) {
  (style as any).styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
