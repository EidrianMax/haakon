import { API_URL } from './constants'
import { validateToken } from './helpers/validators'

export default async function retrieveFavGames (token) {
  validateToken(token)

  const res = await fetch(`${API_URL}/users/favs`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    const { error } = await res.json()

    throw new Error(error)
  }

  const favGames = await res.json()

  return favGames
}
