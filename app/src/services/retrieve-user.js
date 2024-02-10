import { API_URL } from './constants'

/**
 * Retrieve the user data.
 *
 * @param {string} token
 */

export default async function retrieveUser (token) {
  if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
  if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { status } = res

  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(error)
  }

  if (status === 200) {
    return await res.json()
  } else throw new Error('unknow error')
}
