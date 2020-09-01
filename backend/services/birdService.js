/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');
const Bird = require('../models/bird.js');
const User = require('../models/user.js');

const config = require('../utils/config');

const { CLOUD_NAME, API_KEY, API_SECRET, SECRET } = config;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const getBirds = async (request, response) => {
  const birds = await Bird.find({}).populate('user', { username: 1, name: 1 });
  response.json(birds.map((bird) => bird.toJSON()));
};

const getBirdbyId = async (request, response, next) => {
  try {
    const bird = await Bird.findById(request.params.id);
    if (bird) {
      response.json(bird.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
};

const createBird = async (request, response, next) => {
  const { body } = request;
  const token = getTokenFrom(request);
  try {
    const decodedToken = jwt.verify(token, SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const { file } = request;
    if (!file || !request.body.commonname) {
      return response.status(400).json({
        error: 'Bird detail not found. Please make sure image and name exist',
      });
    }

    const { commonname, species, rarity, lat, long, date } = body;

    const currentDate = new Date();
    const result = await cloudinary.v2.uploader.upload(file.path);
    const { public_id, version, secure_url } = result;

    const bird = new Bird({
      commonname,
      species,
      rarity,
      lat: lat || 0,
      long: long || 0,
      imageUrl: secure_url,
      public_id,
      version,
      date,
      dateAdded: currentDate,
      user: user._id,
      username: user.username,
    });
    const savedBird = await bird.save();
    user.birds = user.birds.concat(savedBird._id);
    await user.save();
    response.json(savedBird.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const removeBird = async (request, response, next) => {
  const token = getTokenFrom(request);
  const bird = await Bird.findById(request.params.id);
  const decodedToken = jwt.verify(token, SECRET);
  const user = await User.findById(decodedToken.id);
  if (!token || !decodedToken.id || bird.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Token missing or invalid' });
  }
  try {
    await Bird.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
};

const updateBird = async (request, response, next) => {
  const currentDate = new Date();

  const { body } = request;
  const token = getTokenFrom(request);
  const bird = await Bird.findById(request.params.id);

  try {
    const decodedToken = jwt.verify(token, SECRET);
    const user = await User.findById(decodedToken.id);
    if (!token || !decodedToken.id || bird.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
    const { commonname, species, rarity, lat, long, imageUrl, public_id, version, date } = body;
    let birdToEdit = {
      commonname,
      species,
      rarity,
      lat: lat || 0,
      long: long || 0,
      imageUrl,
      public_id,
      version,
      user: user._id,
      username: user.username,
      date,
      dateAdded: currentDate,
    };

    if (request.file !== undefined) {
      cloudinary.v2.uploader.destroy(public_id);
      const result = await cloudinary.v2.uploader.upload(request.file.path);

      birdToEdit = {
        ...birdToEdit,
        public_id: result.public_id,
        version: result.version,
        imageUrl: result.secure_url,
      };
    }

    const editedBird = await Bird.findByIdAndUpdate(request.params.id, birdToEdit, { new: true });
    response.json(editedBird.toJSON());
  } catch (exception) {
    next(exception);
  }
};

module.exports = {
  getBirds,
  getBirdbyId,
  createBird,
  removeBird,
  updateBird,
};
