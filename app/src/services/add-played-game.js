import { validateToken, validateId } from './helpers/validators'
import { API_URL } from './constants'

export default async function addPlayedGame (token, gameId) {
  validateToken(token)
  validateId(gameId)

  const res = await fetch(`${API_URL}/users/played/${gameId}`, {
    method: 'POST',
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
