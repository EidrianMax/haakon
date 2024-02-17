import { validateToken, validatePassword } from './helpers/validators'
import { API_URL } from './constants'

/**
 * Unregister a user
 *
 * @param {String} token
 * @param {String} password
 */

export default async function unregisterUser (token, password) {
  validateToken(token)
  validatePassword(password)

  const res = await fetch(`${API_URL}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ password })
  })

  if (!res.ok) {
    const { error } = await res.json()

    throw new Error(error)
  }
}
