/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  name: String,
  passwordHash: String,
  birds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bird' }],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports = User;
