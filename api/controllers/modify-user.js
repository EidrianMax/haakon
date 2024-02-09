const { modifyUser } = require('logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res) => {
    const { headers: { authorization }, body: data } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        modifyUser(id, data)
            .then(() => res.status(204).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}