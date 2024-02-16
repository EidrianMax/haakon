import { API_URL } from './constants'
import { validateName, validateUsername, validatePassword } from './helpers/validators'

/**
 * Signs up a user in the application.
 *
 * @param {string} name The full name of the user to be registered.
 * @param {string} username The username of the user to be registered.
 * @param {string} password The password of the user to be registered.
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @returns User registered
 */

export default async function registerUser (name, username, password) {
  validateName(name)
  validateUsername(username)
  validatePassword(password)

  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, username, password })
  })

  const { status } = res

  if (status === 201) {
    const user = await res.json()

    return user
  }

  if (status === 409 || status === 400) {
    const { error } = await res.json()

    throw new Error(error)
  } else {
    throw new Error('unknown error')
  }
}
