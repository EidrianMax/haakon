const { addGameInUser } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res, next) => {
  const { headers: { authorization }, params: { gameId } } = req

  try {
    const { sub: userId } = validateAuthorizationAndExtractPayload(authorization)

    const favGames = await addGameInUser('playedGames', userId, gameId)

    res.json(favGames)
  } catch (error) {
    next(error)
  }
}
