var express = require('express');
const route = express.Router();
const { createEmployment, getAllListEmployment, getEmploymentTimeKeeping, getSalary, deleteEmployment, updateEmployment } = require('../controller/employmentController');

route.post('/', createEmployment);
route.post('/employments', getAllListEmployment);
route.post('/time', getEmploymentTimeKeeping);
route.post('/salaray', getSalary);
route.put('/employments', updateEmployment)
route.delete('/employments', deleteEmployment)

module.exports = route;