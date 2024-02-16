import { API_URL } from './constants'
import { validateId, validateToken } from './helpers/validators'

export default async function deleteFavGame (token, gameId) {
  validateToken(token)
  validateId(gameId)

  const res = await fetch(`${API_URL}/users/favs/${gameId}`, {
    method: 'DELETE',
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
