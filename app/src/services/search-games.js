import { validateQuery } from './helpers/validators'
import { API_URL } from './constants'

/**
 * Search games by query
 *
 * @param {string} query The query wath will be search
 */

export default async function searchGames (query) {
  validateQuery(query)

  const res = await fetch(`${API_URL}/games?q=${query}`, {
    method: 'GET'
  })

  if (!res.ok) {
    return []
  }

  const games = await res.json()

  return games
}
