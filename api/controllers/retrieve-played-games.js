const { retrievePlayedGames } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res, next) => {
  const { headers: { authorization } } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    const favGames = await retrievePlayedGames(id)

    res.json(favGames)
  } catch (error) {
    next(error)
  }
}
