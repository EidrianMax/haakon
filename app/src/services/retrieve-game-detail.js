import { validateId } from './helpers/validators'
import { API_URL } from './constants'

/**
 * Retrieve one game detail
 *
 * @param {String} id The id of the game that will be retrieve
 */

export default async function retrieveGameDetail (gameId) {
  validateId(gameId)

  const res = await fetch(`${API_URL}/games/${gameId}`)

  if (!res.ok) {
    const { error } = res.json()

    throw new Error(error)
  }

  const gameDetail = await res.json()

  return gameDetail
}
