var express = require('express');
const route = express.Router();
const { createEmployment, getAllListEmployment, getEmploymentTimeKeeping, getSalary } = require('../controller/employmentController');

route.post('/', createEmployment);
route.post('/employments', getAllListEmployment);
route.post('/time', getEmploymentTimeKeeping);
route.post('/salaray', getSalary);

module.exports = route;