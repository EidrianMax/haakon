const { models: { Game } } = require('@haakon/api-database')

async function retrieveAllGames () {
  const games = await Game.find()
    .populate('platforms', { name: 1 })
    .populate('genres', { name: 1 })

  return games
}

module.exports = retrieveAllGames
