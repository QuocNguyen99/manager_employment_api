var express = require('express');
const route = express.Router();
const { sendReportTimekeeping } = require('../controller/mailController');

route.post('/', sendReportTimekeeping);

module.exports = route;