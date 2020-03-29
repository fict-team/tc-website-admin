const { default: i18Next } = require('next-i18next');

const i18n = new i18Next({
  defaultLanguage: 'en',
  otherLanguages: ['ru', 'ua'],
});

module.exports = i18n;
module.exports.default = i18n;

