import { validateToken, validateOldPassword, validatePassword } from './helpers/validators'
import { API_URL } from './constants'

/**
 * Modify the password of the user
 *
 * @param {String} token Token
 * @param {String} oldPassword OldPaswword
 * @param {String} password Password
 */

export default async function modifyUserPassword (token, oldPassword, password) {
  validateToken(token)
  validateOldPassword(oldPassword)
  validatePassword(password)

  const res = await fetch(`${API_URL}/users`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ oldPassword, password })
  })

  if (!res.ok) {
    const { error } = await res.json()

    throw new Error(error)
  }
}
