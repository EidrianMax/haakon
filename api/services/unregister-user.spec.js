require('dotenv').config()
const unregisterUser = require('./unregister-user')
const { mongoose, models: { User } } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { CredentialsError, FormatError, NotFoundError } = require('@haakon/api-errors')
const { env: { MONGO_URL } } = process
const bcrypt = require('bcryptjs')

describe('unregisterUser', () => {
  let userId
  const user = {
    name: 'Jhon Doe',
    username: 'jhondoe',
    password: Math.random().toString(36).slice(2)
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

  it('Should succeed when user is deleted from data base', async () => {
    const { password } = user

    await unregisterUser(userId, password)

    const _user = await User.findById(userId)

    expect(_user).toBeNull()
  })

  it('Should fail with wrong password', async () => {
    try {
      await unregisterUser(userId, '12345678')
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(CredentialsError)
      expect(error.message).toBe('Wrong password')
    }
  })

  it('Should fail when user id does not correspond to any user', async () => {
    const userId = new ObjectId().toString()

    const { password } = user

    try {
      await unregisterUser(userId, password)
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toBe(`user with id ${userId} not found`)
      expect(error).toBeInstanceOf(NotFoundError)
    }
  })

  describe('When parameters are note valid', () => {
    describe('When id is not valid', () => {
      it('should fail when id is not a string', async () => {
        await expect(unregisterUser(true, {})).rejects.toThrow(TypeError)
        await expect(unregisterUser(123, {})).rejects.toThrow(TypeError)
        await expect(unregisterUser({}, {})).rejects.toThrow(TypeError)
        await expect(unregisterUser(() => { }, {})).rejects.toThrow(TypeError)
        await expect(unregisterUser([], {})).rejects.toThrow(TypeError)
      })

      it('should fail when id is empty or blank', async () => {
        await expect(unregisterUser('', {})).rejects.toThrow(FormatError)
        await expect(unregisterUser('   ', {})).rejects.toThrow(FormatError)
      })

      it('should fail when id has spaces', async () => {
        await expect(unregisterUser(' abcd1234abcd1234abcd1234 ', {})).rejects.toThrow(FormatError)
        await expect(unregisterUser('abcd 1234abc d1234abc d1234', {})).rejects.toThrow(FormatError)
      })

      it('should fail when id is not valid', async () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        await expect(unregisterUser(wrongMongoId)).rejects.toThrow(FormatError)
      })
    })

    describe('When password is not valid', () => {
      it('Should fail when password is not a string', async () => {
        await expect(unregisterUser(userId, true)).rejects.toThrow(TypeError)
        await expect(unregisterUser(userId, 123)).rejects.toThrow(TypeError)
        await expect(unregisterUser(userId, {})).rejects.toThrow(TypeError)
        await expect(unregisterUser(userId, () => { })).rejects.toThrow(TypeError)
        await expect(unregisterUser(userId, [])).rejects.toThrow(TypeError)
      })

      it('Should fail when password is empty', async () => {
        await expect(unregisterUser(userId, '')).rejects.toThrow(FormatError)
        await expect(unregisterUser(userId, '   ')).rejects.toThrow(FormatError)
      })

      it('Should fail when password has spaces around', async () => {
        await expect(unregisterUser(userId, ' 123123123 ')).rejects.toThrow(FormatError)
        await expect(unregisterUser(userId, '1231 23123')).rejects.toThrow(FormatError)
      })

      it('Should fail when password length is less than 8 characters', async () => {
        await expect(unregisterUser(userId, '1231')).rejects.toThrow(FormatError)
      })
    })
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
