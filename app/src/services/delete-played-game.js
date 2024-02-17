import { API_URL } from './constants'
import { validateId, validateToken } from './helpers/validators'

export default async function deletePlayedGame (token, gameId) {
  validateToken(token)
  validateId(gameId)

  const res = await fetch(`${API_URL}/users/played/${gameId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    const { error } = await res.json()

    throw new Error(error)
  }

  const playedGames = await res.json()

  return playedGames
}
