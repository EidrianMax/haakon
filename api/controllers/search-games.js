const { searchGames } = require('@haakon/api-services')

module.exports = async (req, res, next) => {
  const { query: { q } } = req

  try {
    const games = await searchGames(q)
    res.json(games)
  } catch (error) {
    next(error)
  }
}
