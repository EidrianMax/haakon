const { retrieveUser } = require('logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res) => {
    const { headers: { authorization } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        retrieveUser(id)
            .then(user => res.json(user))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}