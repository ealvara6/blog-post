import express from 'express';
import createRoutes from './routes';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import passport from './config/passport';
import { unescapeJsonMiddleWare } from './middleware/unescapeJson';
import path from 'path';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(unescapeJsonMiddleWare);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
const PUBLIC_DIR = path.join(process.cwd(), 'public');
app.use('/uploads', express.static(path.join(PUBLIC_DIR, 'uploads')));

app.use('/api', createRoutes(prisma));

export default app;
