const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');
require ('dotenv').config ();
const url = process.env.MONGODB_URI;

mongoose
  .connect (url, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then (result => {
    console.log ('connected to MongoDB');
  })
  .catch (error => {
    console.log ('error connecting to MongoDB:', error.message);
  });

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

birdSchema.plugin (uniqueValidator);

const Bird = mongoose.model ('bird', birdSchema);

const bird = new Bird ({
  commonname: 'crow',
  species: 'corvus',
  rarity: 'common',
  date: new Date (),
  location: [24, 58],
});

birdSchema.set ('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString ();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model ('Bird', birdSchema);
