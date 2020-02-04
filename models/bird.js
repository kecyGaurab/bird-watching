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
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

birdSchema.set ('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString ();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model ('Bird', birdSchema);
