const { validateId, validateProperty } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')
const { models: { User, Game } } = require('@haakon/api-database')

async function pushFavGame (property, userId, gameId) {
  validateProperty(property)
  validateId(userId)
  validateId(gameId)

  const user = await User.findById(userId)

  if (!user) throw new NotFoundError(`user with id ${userId} not found`)

  const game = await Game.findById(gameId)

  if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

  const newGames = user[property].filter(favGame => favGame.toString() !== gameId)

  user[property] = newGames

  const userSaved = await user.save()

  const games = await Game.find({ _id: { $in: userSaved[property] } })
    .populate('platforms', { name: 1 })
    .populate('genres', { name: 1 })

  return games
}

module.exports = pushFavGame
