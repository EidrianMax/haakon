require('dotenv').config()
const { models: { User, Game }, mongoose } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { FormatError, NotFoundError } = require('@haakon/api-errors')
const retrieveFavGames = require('./retrieve-fav-games')

const { MONGO_URL } = process.env

describe('retrieveFavGames', () => {
  let userId

  beforeAll(async () => {
    await mongoose.connect(MONGO_URL)
  })

  beforeEach(async () => {
    await User.deleteMany()

    const games = await Game.find({})

    const user = {
      name: 'Jhon Doe',
      username: 'jhondoe',
      password: Math.random().toString(36).slice(2),
      favGames: [games[0].id, games[1].id, games[2].id]
    }

    const userSaved = await User.create(user)

    userId = userSaved.id
  })

  it('shoul succed when retrieve fav games', async () => {
    const gameFavs = await retrieveFavGames(userId)
    expect(gameFavs).toBeInstanceOf(Array)
    expect(gameFavs).toHaveLength(3)
  })

  it('should fail when user do not exits', async () => {
    const falseUserId = new ObjectId().toString()

    try {
      await retrieveFavGames(falseUserId)
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`user with id ${falseUserId} not found`)
    }
  })

  describe('when parameters are not valid', () => {
    describe('when user id is not valid', () => {
      it('should fail when id is not a string', async () => {
        await expect(retrieveFavGames(true)).rejects.toThrow(TypeError)
        await expect(retrieveFavGames(123)).rejects.toThrow(TypeError)
        await expect(retrieveFavGames({})).rejects.toThrow(TypeError)
        await expect(retrieveFavGames(() => { })).rejects.toThrow(TypeError)
        await expect(retrieveFavGames([])).rejects.toThrow(TypeError)
      })

      it('should fail when id is empty or blank', async () => {
        await expect(retrieveFavGames('')).rejects.toThrow(FormatError)
        await expect(retrieveFavGames('   ')).rejects.toThrow(FormatError)
      })

      it('should fail when id has spaces', async () => {
        await expect(retrieveFavGames(' abcd1234abcd1234abcd1234 ')).rejects.toThrow(FormatError)
        await expect(retrieveFavGames('abcd 1234abc d1234abc d1234')).rejects.toThrow(FormatError)
      })

      it('should fail when id is not valid', async () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        await expect(retrieveFavGames(wrongMongoId)).rejects.toThrow(FormatError)
      })
    })
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
