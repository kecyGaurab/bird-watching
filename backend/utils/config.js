require('dotenv').config();

const PORT = process.env.PORT || 5000;
const { MONGODB_URI, CLOUD_NAME, API_KEY, API_SECRET, SECRET } = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  SECRET,
};
