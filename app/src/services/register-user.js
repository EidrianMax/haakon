import { API_URL } from './constants'

/**
 * Signs up a user in the application.
 *
 * @param {string} name The full name of the user to be registered.
 * @param {string} username The username of the user to be registered.
 * @param {string} password The password of the user to be registered.
 *
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

export default async function registerUser (name, username, password) {
  if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
  if (!name.trim().length) throw new Error('name is empty or blank')
  if (name.trim() !== name) throw new Error('blank spaces around name')

  if (typeof username !== 'string') throw new TypeError(username + ' is not a string')
  if (!username.trim().length) throw new Error('username is empty or blank')
  if (/\r?\n|\r|\t| /g.test(username)) throw new Error('username has blank spaces')
  if (username.length < 4) throw new Error('username has less than 4 characters')

  if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
  if (!password.trim().length) throw new Error('password is empty or blank')
  if (/\r?\n|\r|\t| /g.test(password)) throw new Error('password has blank spaces')
  if (password.length < 6) throw new Error('password has less than 6 characters')

  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, username, password })
  })

  const { status } = res

  if (status === 201) {
    return
  }

  if (status === 409 || status === 400) {
    const { error } = await res.json()

    throw new Error(error)
  } else {
    throw new Error('unknown error')
  }
}
