const { searchGames } = require('@haakon/api-services')
const { handleError } = require('./helpers')

module.exports = async (req, res) => {
    const { query: { q } } = req

    try {
        const games = await searchGames(q)
        res.json(games)
    } catch (error) {
        handleError(error, res)
    }
}