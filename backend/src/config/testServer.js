const express = require('express');
const createRoutes = require('../routes');

const passport = require('passport');
require('../config/passport');

const createTestServer = (prismaMock) => {
  const app = express();
  app.use(express.json());

  app.use(passport.initialize());

  app.use('/api', createRoutes(prismaMock));

  return app;
};

module.exports = createTestServer;
