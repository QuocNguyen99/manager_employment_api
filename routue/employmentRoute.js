var express = require('express');
const route = express.Router();
const { createEmployment } = require('../controller/employmentController');

route.post('/', createEmployment);

module.exports = route;