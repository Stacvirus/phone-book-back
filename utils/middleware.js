const logger = require("./logger")
const requestLogger = (req, res, next) =>{
    logger.info("Method:", req.method)
    logger.info("Path:", req.path)
    logger.info("Body:", req.Body)
    logger.info("---")
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknwon endpoint' });
}

// error handler function
function errorHandler(error, req, res, next) {
    console.log(error.message);
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformed id' });
    } if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}