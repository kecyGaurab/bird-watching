/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
  commonname: {
    type: String,
    minlength: 3,
    required: true,
  },
  species: {
    type: String,
    required: false,
  },
  rarity: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: false,
  },
  long: {
    type: Number,
    required: false,
  },
});

birdSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Bird', birdSchema);
