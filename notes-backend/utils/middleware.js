const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Body: ", req.body);
  logger.info("---------");
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  next(error);
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
};
