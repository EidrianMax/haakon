const { retrievePlayingGames } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res, next) => {
  const { headers: { authorization } } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    retrievePlayingGames(id)
      .then(favGames => res.json(favGames))
      .catch(next)
  } catch (error) {
    next(error)
  }
}
