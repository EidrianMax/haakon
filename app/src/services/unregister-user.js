import { API_URL } from './constants'

/**
 * Unregister a user of a aplication
 *
 * @param {*} token
 * @param {*} password
 */

export default async function unregisterUser (token, password) {
  if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
  if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')

  if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
  if (!password.trim().length) throw new Error('password is empty or blank')
  if (/\r?\n|\r|\t| /g.test(password)) throw new Error('password has blank spaces')
  if (password.length < 6) throw new Error('password has less than 6 characters')

  const res = await fetch(`${API_URL}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ password })
  })

  const { status } = res

  if (status === 201) return

  if (status === 400 || status === 401) {
    const { error } = await res.json()

    throw new Error(error)
  } else throw new Error('unknown error')
}
