var express = require('express');
const route = express.Router();
const { creatContract, getListContract, editContract, deleteContract } = require('../controller/contractController');

route.post('/', creatContract);
route.post('/contracts', getListContract);
route.put('/contracts', editContract);
route.delete('/contracts', deleteContract);


module.exports = route;