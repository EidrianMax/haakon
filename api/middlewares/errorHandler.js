const { CredentialsError, FormatError, NotFoundError, ConflictError } = require('@haakon/api-errors')
const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken')
const logger = require('../utils/my-logger')

module.exports = (error, req, res, next) => {
  let status = 500

  if (error instanceof CredentialsError || error instanceof TokenExpiredError) {
    status = 401
  } else if (error instanceof TypeError || error instanceof FormatError || error instanceof JsonWebTokenError) {
    status = 400
  } else if (error instanceof NotFoundError) {
    status = 404
  } else if (error instanceof ConflictError) {
    status = 409
  }

  if (status < 500) {
    logger.warn(error.message)
  } else {
    logger.error(error.message)
  }

  res.status(status).json({ error: error.message })
}
