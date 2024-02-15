require('dotenv').config()
const retrieveUser = require('./retrieve-user')
const { mongoose, models: { User } } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('@haakon/api-errors')

const { MONGO_URL } = process.env

describe('retrieveUser', () => {
  let userId
  const user = {
    name: 'Jhon Doe',
    username: 'jhondoe',
    password: Math.random().toString(36).slice(2)
  }

  beforeAll(async () => {
    mongoose.connect(MONGO_URL)
  })

  beforeEach(async () => {
    await User.deleteMany()

    const _user = await User.create(user)

    userId = _user.id
  })

  it('should succeed with correct id for an already existing user', async () => {
    const { name, username } = user

    const _user = await retrieveUser(userId)
    expect(_user.name).toBe(name)
    expect(_user.username).toBe(username)
  })

  it('should fail with incorrect id', async () => {
    const mongoId = new ObjectId().toString()

    try {
      await retrieveUser(mongoId)
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`user with id ${mongoId} not found`)
    }
  })

  describe('when parameters are not valid', () => {
    describe('when id is not valid', () => {
      it('should fail when id is not a string', async () => {
        await expect(retrieveUser(true)).rejects.toThrow(TypeError)
        await expect(retrieveUser(123)).rejects.toThrow(TypeError)
        await expect(retrieveUser({})).rejects.toThrow(TypeError)
        await expect(retrieveUser(() => { })).rejects.toThrow(TypeError)
        await expect(retrieveUser([])).rejects.toThrow(TypeError)
      })

      it('should fail when id is empty or blank', async () => {
        await expect(retrieveUser('')).rejects.toThrow(FormatError)
        await expect(retrieveUser('   ')).rejects.toThrow(FormatError)
      })

      it('should fail when id has spaces', async () => {
        await expect(retrieveUser(' abcd1234abcd1234abcd1234 ')).rejects.toThrow(FormatError)
        await expect(retrieveUser('abcd 1234abc d1234abc d1234')).rejects.toThrow(FormatError)
      })

      it('should fail when id is not valid', async () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        await expect(retrieveUser(wrongMongoId)).rejects.toThrow(FormatError)
      })
    })
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
