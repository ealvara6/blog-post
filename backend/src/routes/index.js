const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const passport = require('passport');

const createRoutes = (prisma) => {
  const router = express.Router();
  router.use('/users', userRoutes(prisma));
  router.use('/login', authRoutes(prisma));

  router.get('/health', (req, res) => {
    res.status(200).json({ status: 'This is a public health check' });
  });

  router.get(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      return res.json({
        message: 'You have accessed a protected route!',
        user: req.user,
      });
    }
  );

  router.all('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  return router;
};

module.exports = createRoutes;
