const { models: { Game } } = require('@haakon/api-database')
const { validateQuery } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')

function searchGames (query) {
  validateQuery(query)

  // const regex = new RegExp(`\\b[${query}]\\w*\\b`, 'gi')
  // console.log(query.match(regex))
  // $regex: `\\b[${query}]\\w*\\b`, $options: 'gi'
  const regex = new RegExp(query, 'i')

  return (async () => {
    const games = await Game.find({ name: regex }).populate('platforms', {
      name: 1
    }).populate('genres', {
      name: 1
    }).lean()

    if (!games.length) throw new NotFoundError('no game found with that match')

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

module.exports = searchGames
