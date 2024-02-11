const { retrieveFavGames } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res, next) => {
  const { headers: { authorization } } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    retrieveFavGames(id)
      .then(favGames => res.json(favGames))
      .catch(next)
  } catch (error) {
    next(error)
  }
}
