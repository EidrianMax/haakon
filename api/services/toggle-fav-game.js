const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')
const { models: { User, Game } } = require('@haakon/api-database')

function toggleFavGame (userId, gameId) {
  validateId(userId)
  validateId(gameId)

  return (async () => {
    const game = await Game.findById(gameId).lean()

    if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    const index = user.favGames.findIndex(id => id.toString() === gameId)

    if (index < 0) user.favGames.push(gameId)
    else user.favGames.splice(index, 1)

    await user.save()
  })()
}

module.exports = toggleFavGame

// Comprobrar que el gameId existe
