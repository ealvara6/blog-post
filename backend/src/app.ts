import express from 'express';
import createRoutes from './routes';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import passport from './config/passport';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());
app.use(passport.initialize());

app.use('/api', createRoutes(prisma));

export default app;
