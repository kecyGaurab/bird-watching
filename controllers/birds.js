/* eslint-disable consistent-return */
const birdsRouter = require('express').Router();
const express = require('express');
const Bird = require('../models/bird.js');

const app = express();

const uploader = require('../uploader');

const upload = uploader.configure(app);

birdsRouter.get('/', async (request, response) => {
  const birds = await Bird.find({});
  response.json(birds.map((bird) => bird.toJSON()));
});

birdsRouter.post('/', upload.single('image'), async (request, response, next) => {
  const { file } = request;
  if (!file || !request.body.commonname) {
    return response.status(400).json({
      error: 'Bird detail not found. Please make sure image and name exist',
    });
  }

  const { body } = request;
  const currentDate = new Date();

  const bird = new Bird({
    commonname: body.commonname,
    species: body.species,
    rarity: body.rarity,
    image: file.filename,
    latitude: body.latitude,
    longitude: body.longitude,
    date: currentDate,
  });
  try {
    const savedBird = await bird.save();
    response.json(savedBird.toJSON());
  } catch (exception) {
    next(exception);
  }
});

birdsRouter.get('/:id', async (request, response, next) => {
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
});

birdsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Bird.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = birdsRouter;
