const { models: { User } } = require('@haakon/api-database')
const { NotFoundError, CredentialsError } = require('@haakon/api-errors')
const { validateId, validatePassword } = require('./helpers/validators')
const bcrypt = require('bcryptjs')

function unregisterUser (id, password) {
  validateId(id)
  validatePassword(password)

  return (async () => {
    const user = await User.findById(id)

    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    if (!bcrypt.compareSync(password, user.password)) throw new CredentialsError('Wrong password')

    await user.delete(id)

    return ('User deleted successfully')
  })()
}
module.exports = unregisterUser
