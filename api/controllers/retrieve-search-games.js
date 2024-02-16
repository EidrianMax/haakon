const { searchGames, retrieveAllGames } = require('@haakon/api-services')

module.exports = async (req, res, next) => {
  const q = req?.query?.q

  // TODO integrate retrieveAllGames to searchGame
  try {
    if (!q) {
      const games = await retrieveAllGames()

      // FIXME toJson from schema game
      return res.json(games)
    }

    const games = await searchGames(q)

    // FIXME toJson from schema game
    res.json(games)
  } catch (error) {
    next(error)
  }
}
