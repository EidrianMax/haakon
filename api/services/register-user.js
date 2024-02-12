const { validateName, validateUsername, validatePassword } = require('./helpers/validators')
const { ConflictError } = require('@haakon/api-errors')
const { models: { User } } = require('@haakon/api-database')
const bcrypt = require('bcryptjs')

/**
 *
 * @param {String} name
 * @param {String} username
 * @param {String} password
 * @returns {Object} User registered
 */

async function registerUser (name, username, password) {
  validateName(name)
  validateUsername(username)
  validatePassword(password)

  try {
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      username,
      password: hashPassword
    })

    const user = await newUser.save()

    return {
      name: user.name,
      username: user.username
    }
  } catch (error) {
    if (error.code === 11000) { throw new ConflictError(`user with username ${username} already exists`) }

    throw error
  }
}

module.exports = registerUser
