const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')
const { models: { User, Game } } = require('@haakon/api-database')

function retrieveFavGames (userId) {
  validateId(userId)

  return (async () => {
    const user = await User.findById(userId).lean()

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    const games = await Game.find({ _id: { $in: user.favGames } }).populate('platforms', {
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

module.exports = retrieveFavGames
