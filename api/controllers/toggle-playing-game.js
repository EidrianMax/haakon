const { togglePlayingGame } = require('logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res) => {
    const { headers: { authorization }, body: { gameId } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        togglePlayingGame(id, gameId)
            .then(() => res.status(201).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}