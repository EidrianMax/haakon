const { models: { Game } } = require('@haakon/api-database')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')

async function retrieveGame (gameId) {
  validateId(gameId)

  const game = await Game.findById(gameId)
    .populate('platforms', { name: 1 })
    .populate('genres', { name: 1 })

  if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

  return game
}

module.exports = retrieveGame
