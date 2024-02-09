const { validateUsername, validatePassword } = require('./helpers/validators')
const { CredentialsError } = require('@haakon/api-errors')
const { models: { User } } = require('@haakon/api-database')
const bcrypt = require('bcryptjs')

/**
 *
 * @param {String} username
 * @param {String} password
 */

function authenticateUser (username, password) {
  validateUsername(username)
  validatePassword(password)

  return (async () => {
    const user = await User.findOne({ username })
    if (!user || !bcrypt.compareSync(password, user.password)) throw new CredentialsError('wrong credentials')

    return user.id
  })()
}

module.exports = authenticateUser
