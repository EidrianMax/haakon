const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')
const { models: { User } } = require('@haakon/api-database')

async function retrieveFavGames (userId) {
  validateId(userId)

  const user = await User.findById(userId)

  if (!user) throw new NotFoundError(`user with id ${userId} not found`)

  return user.favGames
}

module.exports = retrieveFavGames
