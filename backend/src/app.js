const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
const upload = multer();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use('/api', routes(prisma));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Backend is running!' });
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
