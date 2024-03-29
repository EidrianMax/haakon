const { models: { Game } } = require('@haakon/api-database')
const { validateQuery } = require('./helpers/validators')

async function searchGames (query) {
  validateQuery(query)

  const regex = new RegExp(query, 'i')

  const games = await Game.find({ name: regex })
    .populate('platforms', { name: 1 })
    .populate('genres', { name: 1 })

  if (!games.length) return []

  const gamesToReturn = games.map(game => ({
    id: game.id,
    name: game.name,
    backgroundImage: game.backgroundImage,
    platforms: game.platforms,
    genres: game.genres,
    score: game.score
  }))

  return gamesToReturn
}

module.exports = searchGames
