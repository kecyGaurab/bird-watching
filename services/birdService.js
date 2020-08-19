/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const cloudinary = require('cloudinary');
const Bird = require('../models/bird.js');

const config = require('../utils/config');

const { CLOUD_NAME, API_KEY, API_SECRET } = config;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const getBirds = async (request, response) => {
  const birds = await Bird.find({});
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
  const { file } = request;
  if (!file || !request.body.commonname) {
    return response.status(400).json({
      error: 'Bird detail not found. Please make sure image and name exist',
    });
  }

  const { body } = request;
  const { commonname, species, rarity, lat, long } = body;

  const currentDate = new Date();
  const result = await cloudinary.v2.uploader.upload(file.path);
  const { public_id, version, secure_url } = result;

  const bird = new Bird({
    commonname,
    species,
    rarity,
    lat,
    long,
    image: {
      imageUrl: secure_url,
      public_id,
      version,
    },
    date: currentDate,
  });
  try {
    const savedBird = await bird.save();
    response.json(savedBird.toJSON());
  } catch (exception) {
    next(exception);
  }
};

const removeBird = async (request, response, next) => {
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

  const { commonname, species, rarity, lat, long, imageObj: image } = body;
  let birdToEdit = {
    commonname,
    species,
    rarity,
    lat,
    long,
    image,
    date: currentDate,
  };
  if (request.file) {
    const { public_id: publicId } = image;
    cloudinary.v2.uploader.destroy(publicId);
    const result = await cloudinary.v2.uploader.upload(request.file.path);

    const { public_id, version, secure_url } = result;
    birdToEdit = {
      ...birdToEdit,
      image: {
        public_id,
        version,
        imageUrl: secure_url,
      },
    };
  }

  try {
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
