var express = require('express');
const route = express.Router();
const { sendMail } = require('../controller/mailController');

route.post('/', sendMail);

module.exports = route;