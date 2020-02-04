const express = require ('express');
const multer = require ('multer');
const path = require ('path');

const uploadFolderPath = 'client/public/uploads/';
const storage = multer.diskStorage ({
  destination: (req, file, cb) => {
    cb (null, uploadFolderPath);
  },
  filename: (req, file, cb) => {
    cb (null, Date.now () + path.extname (file.originalname) + '.jpg');
  },
});

exports.configure = app => {
  app.use (express.static (path.join (__dirname, uploadFolderPath)));
  return multer ({storage});
};
