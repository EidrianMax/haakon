import { validateToken, validateName, validateUsername } from './helpers/validators'
import { API_URL } from './constants'

/**
 * Modify the user
 *
 * @param {string} token Token
 * @param {string} name Name
 * @param {string} username Username
 */

export default async function modifyUser (token, name, username) {
  validateToken(token)
  validateName(name)
  validateUsername(username)

  const res = await fetch(`${API_URL}/users`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, username })
  })

  if (!res.ok) {
    const { error } = await res.json()

    throw new Error(error)
  }
}
