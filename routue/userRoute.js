var express = require('express');
const route = express.Router();
const { creatUser, login } = require('../controller/userController');

route.post('/', creatUser);
route.post('/login', login);

module.exports = route;