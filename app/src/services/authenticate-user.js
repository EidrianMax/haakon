import { API_URL } from './constants'

export default async function authenticateUser (username, password) {
  if (typeof username !== 'string') throw new TypeError(`${username} is not a string`)
  if (!username.trim().length) throw new Error('username is empty or blank')
  if (/\r?\n|\r|\t| /g.test(username)) throw new Error('username has blank spaces')
  if (username.length < 4) throw new Error('username has less than 4 characters')

  if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
  if (!password.trim().length) throw new Error('password is empty or blank')
  if (/\r?\n|\r|\t| /g.test(password)) throw new Error('password has blank spaces')
  if (password.length < 6) throw new Error('password has less than 6 characters')

  const res = await fetch(`${API_URL}/users/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  const { status } = res

  if (status === 200) {
    const { token } = await res.json()

    return token
  } else if (status === 401) {
    const { error } = await res.json()

    throw new Error(error)
  } else throw new Error('unknown error')
}
