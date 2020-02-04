const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');
require ('dotenv').config ();
const url = process.env.MONGODB_URI;

connect = () => {
  return (
    mongoose
      .connect (url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      // .then (client => client.db ('Nests'))
      // .then (db => db.collection ('birds'))
      .catch (error => {
        console.log ('error connecting to MongoDB:', error.message);
      })
  );
};

exports.all = () => {
  return connect ().then (collection => {
    return collection.find ({}).toArray ();
  });
};

exports.findOne = query => {
  return connect ().then (collection => {
    return collection.findOne ({query});
  });
};

exports.insert = bird => {
  return connect ().then (collection => {
    return collection.insertOne (bird);
  });
};
