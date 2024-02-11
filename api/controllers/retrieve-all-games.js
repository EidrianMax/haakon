const { retrieveAllGames } = require('@haakon/api-services')
const { handleError } = require('./helpers')

module.exports = async (req, res) => {
  try {
    const games = await retrieveAllGames()
    res.json(games)
  } catch (error) {
    handleError(error, res)
  }
}
