const { models: { User } } = require('@haakon/api-database')
const { NotFoundError, CredentialsError } = require('@haakon/api-errors')
const { validateId, validatePassword } = require('./helpers/validators')
const bcrypt = require('bcryptjs')

async function unregisterUser (id, password) {
  validateId(id)
  validatePassword(password)

  const user = await User.findById(id)

  if (!user) throw new NotFoundError(`user with id ${id} not found`)

  const isMatchPassword = await bcrypt.compare(password, user.password)

  if (!isMatchPassword) throw new CredentialsError('Wrong password')

  await User.findByIdAndDelete(id)
}

module.exports = unregisterUser
