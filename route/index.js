const express = require('express');
const router = express.Router();

const userCreate = require('./api/users');
const userList = require('./api/users.list');
const exercises = require('./api/exercises');
const logs = require('./api/logs');


//api
router.post('/users', userCreate);
router.get('/users', userList);
router.post('/users/:_id/exercises', exercises);
router.get('/users/:_id/logs', logs);

module.exports = router;