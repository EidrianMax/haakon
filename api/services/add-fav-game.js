const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')
const { models: { User, Game } } = require('@haakon/api-database')

async function pushFavGame (userId, gameId) {
  validateId(userId)
  validateId(gameId)

  const user = await User.findById(userId)

  if (!user) throw new NotFoundError(`user with id ${userId} not found`)

  const game = await Game.findById(gameId)

  if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

  user.favGames.push(game.id)

  const userSaved = await user.save()

  return userSaved.favGames
}

module.exports = pushFavGame
