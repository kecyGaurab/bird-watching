const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, `${Date.now() + path.extname(file.originalname)}.jpg`);
    },
  }),
});
