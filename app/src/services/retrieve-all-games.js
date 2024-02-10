import { API_URL } from './constants'

/**
 * Retrieve all games in data base.
 */

export default async function retrieveAllGames () {
  const res = await fetch(`${API_URL}/games/all`, {
    method: 'GET'
  })

  const { status } = res

  if (status === 200) {
    return await res.json()
  } else if (status === 409 || status === 400) {
    const { error } = await res.json()

    throw new Error(error)
  } else throw new Error('unknown error')
}
