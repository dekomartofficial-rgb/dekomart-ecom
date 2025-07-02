// CartifyWebApi/install-chrome.js

const { install } = require('puppeteer/browsers');

(async () => {
  await install({
    browser: 'chrome',
    buildId: '138.0.7204.92' // specify exact version needed
  });
})();
s