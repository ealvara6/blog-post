import express from 'express';
import routes from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import passport from './config/passport';
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
const upload = multer();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());
app.use(passport.initialize());

app.use('/api', routes(prisma));

export default app;
