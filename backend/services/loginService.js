/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const login = async (request, response, next) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    const passWordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passWordCorrect)) {
      return response.status(401).json({
        error: 'Invalid username or password',
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);

    response.status(200).send({ token, username: user.username, name: user.name });
  } catch (exception) {
    next(exception);
  }
};

module.exports = { login };
