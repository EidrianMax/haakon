import { FormatError, ConflictError } from '@haakon/app-errors'

export function validateId (id) {
  if (typeof id !== 'string') throw new TypeError('id is not a string')
  if (!id.trim().length) throw new FormatError('id is empty or blank')
  if (/\r?\n|\r|\t| /g.test(id)) throw new FormatError('id has blank spaces')
}

export function validateUsername (username) {
  if (typeof username !== 'string') throw new TypeError('username is not a string')
  if (!username.trim().length) throw new FormatError('username is empty or blank')
  if (/\r?\n|\r|\t| /g.test(username)) throw new FormatError('username has blank spaces')
  if (username.length < 4) throw new FormatError('username has less than 4 characters')
}

export function validatePassword (password) {
  if (typeof password !== 'string') throw new TypeError('password is not a string')
  if (!password.trim().length) throw new FormatError('password is empty or blank')
  if (/\r?\n|\r|\t| /g.test(password)) throw new FormatError('password has blank spaces')
  if (password.length < 8) throw new FormatError('password has less than 8 characters')
}

export function validateOldPassword (oldPassword) {
  if (typeof oldPassword !== 'string') throw new TypeError('old password is not a string')
  if (!oldPassword.trim().length) throw new FormatError('old password is empty or blank')
  if (/\r?\n|\r|\t| /g.test(oldPassword)) throw new FormatError('old password has blank spaces')
  if (oldPassword.length < 8) throw new FormatError('old password has less than 8 characters')
}

export function validateName (name) {
  if (typeof name !== 'string') throw new TypeError('name is not a string')
  if (!name.trim().length) throw new FormatError('name is empty or blank')
  if (name.trim() !== name) throw new FormatError('blank spaces around name')
}

export function validateData (data) {
  if (typeof data !== 'object' || data.constructor.name !== 'Object') throw new TypeError('data is not an object')

  const { name, username, password, oldPassword } = data

  if (typeof name !== 'undefined') {
    validateName(name)
  }

  if (typeof username !== 'undefined') {
    validateUsername(username)
  }

  if (typeof oldPassword === 'undefined' && typeof password !== 'undefined') throw new ConflictError('old password is not defined')
  if (typeof password === 'undefined' && typeof oldPassword !== 'undefined') throw new ConflictError('password is not defined')

  if (typeof password !== 'undefined') {
    validatePassword(password)
  }

  if (typeof oldPassword !== 'undefined') {
    validateOldPassword(oldPassword)
  }
}

export function validateQuery (query) {
  if (typeof query !== 'string') throw new TypeError('query is not a string')
  if (!query.trim().length) throw new FormatError('query is empty or blank')
}

export function validateProperty (property) {
  if (typeof property !== 'string') throw new TypeError('property is not a string')
  if (!property.trim().length) throw new FormatError('name is empty or blank')
  if (property.trim() !== property) throw new FormatError('blank spaces around name')
}
