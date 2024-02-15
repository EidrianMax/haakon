const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/enviroment')

function validateAuthorizationAndExtractPayload (authorization) {
  // TODO validate authorization
  const [, token] = authorization.split(' ')

  const payload = jwt.verify(token, jwtSecret)

  return payload
}

module.exports = validateAuthorizationAndExtractPayload
