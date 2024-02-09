const { models: { Game, User } } = require('@haakon/api-database')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')

function retrieveGame (gameId, userId) {
  validateId(gameId)
  validateId(userId)

  return (async () => {
    const game = await Game.findById(gameId).populate('platforms', {
      name: 1
    }).populate('genres', {
      name: 1
    }).lean()

    if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

    game.id = game._id.toString()
    delete game._id
    delete game.__v

    const user = await User.findById(userId).lean()

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    game.isFav = user.favGames.some(favId => favId.toString() === gameId)

    game.released = new Intl.DateTimeFormat('es').format(game.released)

    return game
  })()
}

module.exports = retrieveGame
