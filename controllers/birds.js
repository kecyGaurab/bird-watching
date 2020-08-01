/* eslint-disable consistent-return */

const birdsRouter = require('express').Router();
const express = require('express');
const birdService = require('../services/birdService');

const app = express();

const uploader = require('../uploader');

const upload = uploader.configure(app);

birdsRouter.get('/', birdService.getBirds);

birdsRouter.post('/', upload.single('image'), birdService.createBird);

birdsRouter.get('/:id', birdService.getBirdbyId);

birdsRouter.delete('/:id', birdService.removeBird);

birdsRouter.put('/:id', birdService.updateBird);

module.exports = birdsRouter;
