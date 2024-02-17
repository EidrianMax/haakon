const { models: { Game } } = require('@haakon/api-database')

async function retrieveAllGames () {
  const games = await Game.find()
    .populate('platforms', { name: 1 })
    .populate('genres', { name: 1 })

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

module.exports = retrieveAllGames
