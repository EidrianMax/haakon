require('dotenv').config()
const modifyUser = require('./modify-user')
const { mongoose, models: { User } } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { CredentialsError, FormatError, ConflictError, NotFoundError } = require('@haakon/api-errors')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('modifyUser', () => {
  let userId
  const user = {
    name: 'Wendy Pan',
    username: 'wendypan',
    password: Math.random().toString().slice(2)
  }

  beforeAll(async () => {
    await mongoose.connect(MONGO_URL)
  })

  beforeEach(async () => {
    await User.deleteMany()

    const _user = await User.create({
      ...user,
      password: bcrypt.hashSync(user.password)
    })

    userId = _user.id
  })

  it('should succeed if update name and username', async () => {
    const dataToUpdate = {
      name: 'Ervin Howell',
      username: 'Antonette'
    }

    const res = await modifyUser(userId, dataToUpdate)
    expect(res).toBeUndefined()
    const _user = await User.findById(userId)
    expect(_user.name).toBe(dataToUpdate.name)
    expect(_user.username).toBe(dataToUpdate.username)
  })

  it('should succeed if update password', async () => {
    const dataToUpdate = {
      oldPassword: user.password,
      password: Math.random().toString().slice(2)
    }

    const res = await modifyUser(userId, dataToUpdate)
    expect(res).toBeUndefined()

    const _user = await User.findById(userId)
    const isMatchPassword = bcrypt.compareSync(dataToUpdate.password, _user.password)
    expect(isMatchPassword).toBe(true)
  })

  it('should fail updating password on a pre-existing user when old password is wrong', async () => {
    const dataToUpdate = {
      oldPassword: Math.random().toString().slice(2),
      password: Math.random().toString().slice(2)
    }

    try {
      await modifyUser(userId, dataToUpdate)
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeInstanceOf(CredentialsError)
      expect(error.message).toBe('wrong password')
    }
  })

  describe('when another user already exists', () => {
    const user2 = {
      name: 'Peter Pan',
      username: 'peterpan',
      password: '123123123'
    }

    beforeEach(async () => {
      await User.create(user2)
    })

    it('should fail on updating username to a one that already exists', async () => {
      const { username } = user2

      try {
        await modifyUser(userId, { username })
        throw new Error('should not reach this point')
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictError)
        expect(error.message).toBe(`user with username ${username} already exists`)
      }
    })
  })

  it('should fail when user id does not correspond to any user', async () => {
    const userId = new ObjectId().toString()

    try {
      await modifyUser(userId, {})
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`user with id ${userId} not found`)
    }
  })

  describe('when parameters are not valid', () => {
    describe('when id is not valid', () => {
      it('should fail when id is not a string', async () => {
        await expect(modifyUser(true, {})).rejects.toThrow(TypeError)
        await expect(modifyUser(123, {})).rejects.toThrow(TypeError)
        await expect(modifyUser({}, {})).rejects.toThrow(TypeError)
        await expect(modifyUser(() => { }, {})).rejects.toThrow(TypeError)
        await expect(modifyUser([], {})).rejects.toThrow(TypeError)
      })

      it('should fail when id is empty or blank', async () => {
        await expect(modifyUser('', {})).rejects.toThrow(FormatError)
        await expect(modifyUser('   ', {})).rejects.toThrow(FormatError)
      })

      it('should fail when id has spaces', async () => {
        await expect(modifyUser(' abcd1234abcd1234abcd1234 ', {})).rejects.toThrow(FormatError)
        await expect(modifyUser('abcd 1234abc d1234abc d1234', {})).rejects.toThrow(FormatError)
      })

      it('should fail when id is not valid', async () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        await expect(modifyUser(wrongMongoId)).rejects.toThrow(FormatError)
      })
    })

    describe('when data is not valid', () => {
      it('should fail when data is not an object', async () => {
        await expect(modifyUser('abcd1234abcd1234abcd1234', true)).rejects.toThrow(TypeError)
        await expect(modifyUser('abcd1234abcd1234abcd1234', 123)).rejects.toThrow(TypeError)
        await expect(modifyUser('abcd1234abcd1234abcd1234', () => { })).rejects.toThrow(TypeError)
        await expect(modifyUser('abcd1234abcd1234abcd1234', '')).rejects.toThrow(TypeError)
      })
    })

    describe('when properties in data are not valid', () => {
      describe('when name is not valid', () => {
        it('should fail when name is not a string', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { name: true })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { name: 123 })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { name: {} })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { name: () => { } })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { name: [] })).rejects.toThrow(TypeError)
        })

        it('should fail when name is empty', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { name: '' })).rejects.toThrow(FormatError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { name: '   ' })).rejects.toThrow(FormatError)
        })

        it('should fail when name has spaces around', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { name: ' Wendy Pan ' })).rejects.toThrow(FormatError)
        })
      })

      describe('when username is not valid', () => {
        it('should fail when username is not a string', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { username: true })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { username: 123 })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { username: {} })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { username: () => { } })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { username: [] })).rejects.toThrow(TypeError)
        })

        it('should fail when username is empty', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { username: '' })).rejects.toThrow(FormatError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { username: '   ' })).rejects.toThrow(FormatError)
        })

        it('should fail when username has spaces', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { username: ' wendypan ' })).rejects.toThrow(FormatError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { username: 'wendy pan' })).rejects.toThrow(FormatError)
        })

        it('should fail when username length is less that 4 characters', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { username: 'wp' })).rejects.toThrow(FormatError)
        })
      })

      describe('when password is not valid', () => {
        it('should fail when password is not a string', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: true })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: 123 })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: {} })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: () => { } })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: [] })).rejects.toThrow(TypeError)
        })

        it('should fail when password is empty', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: '' })).rejects.toThrow(FormatError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: '   ' })).rejects.toThrow(FormatError)
        })

        it('should fail when password has spaces', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: ' 123123123 ' })).rejects.toThrow(FormatError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: '123 123 123' })).rejects.toThrow(FormatError)
        })

        it('should fail when password length is less that 8 characters', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123', password: '123123' })).rejects.toThrow(FormatError)
        })
      })

      describe('when old password is not valid', () => {
        it('should fail when password is not a string', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: true })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: 123 })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: {} })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: () => { } })).rejects.toThrow(TypeError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: [] })).rejects.toThrow(TypeError)
        })

        it('should fail when password is empty', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: '' })).rejects.toThrow(FormatError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: '   ' })).rejects.toThrow(FormatError)
        })

        it('should fail when password has spaces', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: ' 123123123 ' })).rejects.toThrow(FormatError)
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: '123 123 123' })).rejects.toThrow(FormatError)
        })

        it('should fail when password length is less that 8 characters', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123', oldPassword: '123123' })).rejects.toThrow(FormatError)
        })
      })

      describe('when password or old password is not present', () => {
        it('should fail when password is present and old password not', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { password: '123123123' })).rejects.toThrow(ConflictError)
        })

        it('should fail when old password is present and password not', async () => {
          await expect(modifyUser('abcd1234abcd1234abcd1234', { oldPassword: '123123123' })).rejects.toThrow(ConflictError)
        })
      })
    })
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
