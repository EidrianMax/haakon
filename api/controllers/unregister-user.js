const { unregisterUser } = require('logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res) => {
    const { headers: { authorization }, body: { password } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        unregisterUser(id, password)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}