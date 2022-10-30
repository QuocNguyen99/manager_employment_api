var express = require('express');
const route = express.Router();
const { creatContract } = require('../controller/contractController');

route.post('/', creatContract);

module.exports = route;