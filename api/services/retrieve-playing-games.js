const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')
const { models: { User, Game } } = require('@haakon/api-database')

async function retrievePlayingGames (userId) {
  validateId(userId)

  const user = await User.findById(userId).lean()

  if (!user) throw new NotFoundError(`user with id ${userId} not found`)

  const games = await Game.find({ _id: { $in: user.playingGames } })
    .populate('platforms', { name: 1 })
    .populate('genres', { name: 1 })

  return games
}

module.exports = retrievePlayingGames
