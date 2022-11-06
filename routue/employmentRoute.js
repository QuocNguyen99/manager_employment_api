var express = require('express');
const route = express.Router();
const { createEmployment, getAllListEmployment, getEmploymentTimeKeeping } = require('../controller/employmentController');

route.post('/', createEmployment);
route.post('/employments', getAllListEmployment);
route.post('/time', getEmploymentTimeKeeping);

module.exports = route;