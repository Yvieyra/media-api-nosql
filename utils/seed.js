const connection = require ('../config/connection');
const User = require ('../models/User');
const {names, thoughts} = require ('./data.js');

console.time ('seeding');
