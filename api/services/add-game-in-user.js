const { validateId, validateProperty } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')
const { models: { User, Game } } = require('@haakon/api-database')

/**
 * Add a gameId in favGames, playedGames or playingGames
 * @param {String} property
 * @param {String} userId
 * @param {String} gameId
 * @returns An array depend on its property
 */

async function addGameInUser (property, userId, gameId) {
  validateProperty(property)
  validateId(userId)
  validateId(gameId)

  const user = await User.findById(userId)

  if (!user) throw new NotFoundError(`user with id ${userId} not found`)

  const game = await Game.findById(gameId)

  if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

  // TODO if game is in user will not saved

  user[property].push(game.id)

  const userSaved = await user.save()

  const games = await Game.find({ _id: { $in: userSaved.favGames } })
    .populate('platforms', { name: 1 })
    .populate('genres', { name: 1 })

  return games
}

module.exports = addGameInUser
