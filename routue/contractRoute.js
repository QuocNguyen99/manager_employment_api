var express = require('express');
const route = express.Router();
const { creatContract, getListContract } = require('../controller/contractController');

route.post('/', creatContract);
route.post('/contracts', getListContract);

module.exports = route;