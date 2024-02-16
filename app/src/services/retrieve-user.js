import { validateToken } from './helpers/validators'
import { API_URL } from './constants'

/**
 * Retrieve the user data.
 *
 * @param {string} token
 */

export default async function retrieveUser (token) {
  validateToken(token)

  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    const { error } = await res.json()

    throw new Error(error)
  }

  const user = await res.json()

  return user
}
