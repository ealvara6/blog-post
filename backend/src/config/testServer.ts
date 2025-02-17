import express, { json } from 'express';
import createRoutes from '../routes';
import passport from 'passport';
import './passport';
import { PrismaClient } from '@prisma/client/extension';

const createTestServer = (prismaMock: PrismaClient) => {
  const app = express();
  app.use(json());

  app.use(passport.initialize());

  app.use('/api', createRoutes(prismaMock));

  return app;
};

export default createTestServer;
