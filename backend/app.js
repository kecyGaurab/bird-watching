const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const birdsRouter = require('./controllers/birds');
const usersRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');

app.use(cors());

logger.info('connecting to', process.env.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use('/api/birds', birdsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
