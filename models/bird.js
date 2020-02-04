const mongoose = require ('mongoose');

const birdSchema = new mongoose.Schema ({
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
  image: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: String,
    required: false,
  },
  location: {
    type: [Number],
    required: false,
  },
});

module.exports = mongoose.model ('Blog', blogSchema);
