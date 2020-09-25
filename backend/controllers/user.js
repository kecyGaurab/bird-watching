const usersRouter = require('express').Router();
const userService = require('../services/userService');

usersRouter.get('/', userService.getUser);

usersRouter.post('/', userService.signUpUser);

module.exports = usersRouter;
