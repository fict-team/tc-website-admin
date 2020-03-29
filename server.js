const express = require('express');
const next = require('next');
const { default: i18nMiddleware } = require('next-i18next/middleware');
const { default: i18n } = require('./middlewares/i18n');

const app = next({
  dev: process.env.NODE_ENV !== 'production',
});

const handle = app.getRequestHandler();

(async () => {
  await app.prepare();

  const server = express();

  await i18n.initPromise

  server.use(i18nMiddleware(i18n));
  server.get('*', (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  await server.listen(port);

  console.log(`> Ready on http://localhost:${port}`);
})();
