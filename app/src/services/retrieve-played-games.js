import { API_URL } from './constants'
import { validateToken } from './helpers/validators'

export default async function retrievePlayedGames (token) {
  validateToken(token)

  const res = await fetch(`${API_URL}/users/played`, {
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
