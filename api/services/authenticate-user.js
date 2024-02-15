const { validateUsername, validatePassword } = require('./helpers/validators')
const { CredentialsError } = require('@haakon/api-errors')
const { models: { User } } = require('@haakon/api-database')
const bcrypt = require('bcryptjs')

/**
 *
 * @param {String} username
 * @param {String} password
 * @returns {String} User id
 */

async function authenticateUser (username, password) {
  validateUsername(username)
  validatePassword(password)

  const user = await User.findOne({ username })

  if (!user) throw new CredentialsError('wrong credentials')

  const isMatchPassword = bcrypt.compareSync(password, user.password)

  if (!isMatchPassword) throw new CredentialsError('wrong credentials')

  return user.id
}

module.exports = authenticateUser
