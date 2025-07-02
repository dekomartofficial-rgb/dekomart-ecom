// CartifyWebApi/install-chrome.js

const puppeteer = require('puppeteer');

(async () => {
  await puppeteer.install({
    browser: 'chrome'
  });
})();
