import { API_URL } from './constants'

/**
 * Retrieve one game detail
 *
 * @param {string} id The id of the game that will be retrieve
 */

export default async function retrieveGameDetail (gameId, token) {
  if (typeof gameId !== 'string') throw new TypeError(`${gameId} is not a string`)

  const res = await fetch(`${API_URL}/games/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { status } = res

  if (status === 200) {
    return await res.json()
  } else if (status === 401 || status === 404) {
    const { error } = res.json()

    throw new Error(error)
  } else throw new Error('unknow error')
}
