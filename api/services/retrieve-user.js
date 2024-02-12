const { models: { User } } = require('@haakon/api-database')
const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('@haakon/api-errors')

async function retrieveUser (id) {
  validateId(id)

  const user = await User.findById(id)

  if (!user) throw new NotFoundError(`user with id ${id} not found`)

  return user
}

module.exports = retrieveUser
