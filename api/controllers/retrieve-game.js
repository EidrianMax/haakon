const { retrieveGame } = require('@haakon/api-services')

module.exports = async (req, res, next) => {
  const { params: { gameId } } = req

  try {
    const game = await retrieveGame(gameId)

    // FIXME toJson from schema game
    res.json(game)
  } catch (error) {
    next(error)
  }
}
