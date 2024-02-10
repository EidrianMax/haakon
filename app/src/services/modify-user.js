import { API_URL } from './constants'

/**
 * Modify the user.
 *
 * @param {string} token Token
 * @param {string} name Name
 * @param {string} username Username
 */

export default async function modifyUser (token, name, username) {
  if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
  if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

  if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
  if (!name.trim().length) throw new Error('name is empty or blank')
  if (name.trim() !== name) throw new Error('blank spaces around name')

  if (typeof username !== 'string') throw new TypeError(username + ' is not a string')
  if (!username.trim().length) throw new Error('username is empty or blank')
  if (/\r?\n|\r|\t| /g.test(username)) throw new Error('username has blank spaces')
  if (username.length < 4) throw new Error('username has less than 4 characters')

  const res = await fetch(`${API_URL}/users`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, username })
  })

  const { status } = res

  if (status === 204) return

  if (status === 409 || status === 401) {
    const { error } = await res.json()

    throw new Error(error)
  } else throw new Error('unknoun error')
}
