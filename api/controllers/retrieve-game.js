const { retrieveGame } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res, next) => {
  const { params: { gameId }, headers: { authorization } } = req

  try {
    const { sub: userId } = validateAuthorizationAndExtractPayload(authorization)
    const game = await retrieveGame(gameId, userId)
    res.json(game)
  } catch (error) {
    next(error)
  }
}
