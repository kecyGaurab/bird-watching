/* eslint-disable consistent-return */

const birdsRouter = require('express').Router();
const birdService = require('../services/birdService');

const upload = require('../utils/uploader');

birdsRouter.get('/', birdService.getBirds);

birdsRouter.post('/', upload.single('image'), birdService.createBird);

birdsRouter.get('/:id', birdService.getBirdbyId);

birdsRouter.delete('/:id', birdService.removeBird);

birdsRouter.put('/:id', upload.single('imageToUpdate'), birdService.updateBird);

module.exports = birdsRouter;

