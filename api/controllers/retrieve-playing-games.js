const { retrievePlayingGames } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res, next) => {
  const { headers: { authorization } } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    const favGames = await retrievePlayingGames(id)

    res.json(favGames)
  } catch (error) {
    next(error)
  }
}
