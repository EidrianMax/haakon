import { API_URL } from './constants'

/**
 * Signs up a user in the application.
 *
 * @param {string} query The query wath will be search
 */

export default async function searchGames (query) {
  if (typeof query !== 'string') throw new TypeError(query + ' is not a string')
  if (!query.trim().length) throw new Error('query is empty or blank')
  if (query.trim() !== query) throw new Error('blank spaces around query')

  const res = await fetch(`${API_URL}/games?q=${query}`, {
    method: 'GET'
  })

  const { status } = res

  if (status === 200) {
    return await res.json()
  } else if (status === 404) {
    return []
  } else if (status === 400) {
    const { error } = await res.json()

    throw new Error(error)
  } else throw new Error('unknown error')
}
