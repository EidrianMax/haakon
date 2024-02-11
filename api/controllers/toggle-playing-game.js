const { togglePlayingGame } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res, next) => {
  const { headers: { authorization }, body: { gameId } } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    togglePlayingGame(id, gameId)
      .then(() => res.status(201).send())
      .catch(next)
  } catch (error) {
    next(error)
  }
}
