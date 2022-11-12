var express = require('express');
const route = express.Router();
const { sendReportTimekeeping, sendSalary } = require('../controller/mailController');

route.post('/', sendReportTimekeeping);
route.post('/salary', sendSalary);

module.exports = route;