const { retrieveAllGames } = require('@haakon/api-services')

module.exports = async (req, res, next) => {
  try {
    const games = await retrieveAllGames()
    res.json(games)
  } catch (error) {
    next(error)
  }
}
