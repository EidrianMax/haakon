import { API_URL } from './constants'

/**
 * Retrieve all games.
 */

export default async function retrieveAllGames () {
  const res = await fetch(`${API_URL}/games`, {
    method: 'GET'
  })

  if (!res.ok) {
    const { error } = await res.json()

    throw new Error(error)
  }

  const games = await res.json()

  return games
}
