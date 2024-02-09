const { retrieveGame } = require('logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {
    const { params: { gameId }, headers: { authorization } } = req

    try {
        const { sub: userId } = validateAuthorizationAndExtractPayload(authorization)
        const game = await retrieveGame(gameId, userId)
        res.json(game)
    } catch (error) {
        handleError(error, res)
    }
}