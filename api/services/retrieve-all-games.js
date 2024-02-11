const { models: { Game } } = require('@haakon/api-database')

function retrieveAllGames () {
  return (async () => {
    const games = await Game.find().populate('platforms', {
      name: 1
    }).populate('genres', {
      name: 1
    }).lean()

    games.forEach(game => {
      game.id = game._id.toString()
      delete game._id
      delete game.__v
      delete game.screenshots
      delete game.description
      delete game.released
      delete game.website
    })

    return games
  })()
}

module.exports = retrieveAllGames
