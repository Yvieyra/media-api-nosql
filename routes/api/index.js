const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

//http://localhost:3001/api/users
router.user('/users', userRoutes);

//http://localhost:3001/api/thoughts
router.user('/thoughts', thoughtRoutes);