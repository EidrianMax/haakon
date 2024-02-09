const { searchGames } = require('logic')
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