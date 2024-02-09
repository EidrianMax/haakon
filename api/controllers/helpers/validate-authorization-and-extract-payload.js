const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process

function validateAuthorizationAndExtractPayload(authorization) {
    const [, token] = authorization.split(' ')

    const payload = jwt.verify(token, SECRET)

    return payload
}

module.exports = validateAuthorizationAndExtractPayload