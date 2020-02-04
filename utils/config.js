require ('dotenv').config ();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI || 5000;

module.exports = {
  MONGODB_URI,
  PORT,
};
