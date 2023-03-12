const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { names, thoughts } = require('./data.js');

console.time('seeding');
