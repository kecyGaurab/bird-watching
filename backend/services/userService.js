const bcrypt = require('bcrypt');
const User = require('../models/user');

const getUser = async (request, response) => {
  const users = await User.find({}).populate('birds', {
    commonname: 1,
    species: 1,
    rarity: 1,
    imageUrl: 1,
    public_id: 1,
    version: 1,
    date: 1,
  });
  response.json(users.map((u) => u.toJSON()));
};

const signUpUser = async (request, response, next) => {
  try {
    const { body } = request;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      firstName: body.firstName,
      lastName: body.lastName,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
};

module.exports = { getUser, signUpUser };
