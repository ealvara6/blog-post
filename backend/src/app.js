const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const passport = require('./config/passport');
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

module.exports = app;
