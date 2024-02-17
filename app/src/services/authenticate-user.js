import { validateUsername, validatePassword } from './helpers/validators'
import { API_URL } from './constants'

export default async function authenticateUser (username, password) {
  validateUsername(username)
  validatePassword(password)

  const res = await fetch(`${API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  if (!res.ok) {
    const { error } = await res.json()

    throw new Error(error)
  }

  const { token } = await res.json()

  return token
}
