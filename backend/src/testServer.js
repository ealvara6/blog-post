const express = require('express');
const createRoutes = require('./routes');

const createTestServer = (prismaMock) => {
  const app = express();
  app.use(express.json());
  app.use('/api', createRoutes(prismaMock));

  return app;
};

module.exports = createTestServer;
