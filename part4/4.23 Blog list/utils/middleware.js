const jwt = require('jsonwebtoken');
const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  if (error.message === 'Could not find a blog with this id') {
    res.status(404).json({ error: error.message });
  }

  return next(error);
};

const userExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = '';
  let decodedToken = '';
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7); // cutting out Bearer prefix
  }

  if (token) {
    decodedToken = jwt.verify(token, process.env.SECRET);
  }

  const user = {
    id: decodedToken.id,
    username: decodedToken.username,
  };

  req.user = user;

  return next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
