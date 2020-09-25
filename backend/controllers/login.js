/* eslint-disable consistent-return */

const loginRouter = require('express').Router();
const loginService = require('../services/loginService');

loginRouter.post('/', loginService.login);

module.exports = loginRouter;
