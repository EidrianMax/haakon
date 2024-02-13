require('dotenv').config()
const { models: { User, Game }, mongoose } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('@haakon/api-errors')
const deleteFavGame = require('./delete-fav-game')

const { MONGO_URL } = process.env

describe('deleteFavGame', () => {
  let gameId, userId

  beforeAll(async () => {
    await mongoose.connect(MONGO_URL)
  })

  beforeEach(async () => {
    await User.deleteMany({})

    const games = await Game.find({})

    gameId = games[0].id

    const user = {
      name: 'Jhon Doe',
      username: 'jhondoe',
      password: Math.random().toString(36).slice(2),
      favGames: [gameId]
    }

    const userSaved = await User.create(user)

    userId = userSaved.id
  })

  it('should succed when delete fav game', async () => {
    const favGames = await deleteFavGame(userId, gameId)

    expect(favGames).toBeInstanceOf(Array)
    expect(favGames).toHaveLength(0)

    const user = await User.findById(userId)
    expect(user.favGames).not.toContain(gameId)
  })

  it('should fail when user id do not exist', async () => {
    const falseUserId = new ObjectId().toString()

    try {
      await deleteFavGame(falseUserId, gameId)
      throw new Error('should not reach at this point')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`user with id ${falseUserId} not found`)
    }
  })

  it('should fail when game id do not exist', async () => {
    const falseGameId = new ObjectId().toString()

    try {
      await deleteFavGame(userId, falseGameId)
      throw new Error('should not reach at this point')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`game with id ${falseGameId} not found`)
    }
  })

  describe('when parameters are not valid', () => {
    describe('when user id is not valid', () => {
      it('should fail when id is not a string', async () => {
        await expect(deleteFavGame(true, gameId)).rejects.toThrow(TypeError)
        await expect(deleteFavGame(123, gameId)).rejects.toThrow(TypeError)
        await expect(deleteFavGame({}, gameId)).rejects.toThrow(TypeError)
        await expect(deleteFavGame(() => { }, gameId)).rejects.toThrow(TypeError)
        await expect(deleteFavGame([], gameId)).rejects.toThrow(TypeError)
      })

      it('should fail when id is empty or blank', async () => {
        await expect(deleteFavGame('', gameId)).rejects.toThrow(FormatError)
        await expect(deleteFavGame('   ', gameId)).rejects.toThrow(FormatError)
      })

      it('should fail when id has spaces', async () => {
        await expect(deleteFavGame(' abcd1234abcd1234abcd1234 ', gameId)).rejects.toThrow(FormatError)
        await expect(deleteFavGame('abcd 1234abc d1234abc d1234', gameId)).rejects.toThrow(FormatError)
      })

      it('should fail when id is not valid', async () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        await expect(deleteFavGame(wrongMongoId, gameId)).rejects.toThrow(FormatError)
      })
    })

    describe('when game id is not valid', () => {
      it('should fail when id is not a string', async () => {
        await expect(deleteFavGame(userId, true)).rejects.toThrow(TypeError)
        await expect(deleteFavGame(userId, 123)).rejects.toThrow(TypeError)
        await expect(deleteFavGame(userId, {})).rejects.toThrow(TypeError)
        await expect(deleteFavGame(userId, () => { })).rejects.toThrow(TypeError)
        await expect(deleteFavGame(userId, [])).rejects.toThrow(TypeError)
      })

      it('should fail when id is empty or blank', async () => {
        await expect(deleteFavGame(userId, '')).rejects.toThrow(FormatError)
        await expect(deleteFavGame(userId, '   ')).rejects.toThrow(FormatError)
      })

      it('should fail when id has spaces', async () => {
        await expect(deleteFavGame(userId, ' abcd1234abcd1234abcd1234 ')).rejects.toThrow(FormatError)
        await expect(deleteFavGame(userId, 'abcd 1234abc d1234abc d1234')).rejects.toThrow(FormatError)
      })

      it('should fail when id is not valid', async () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        await expect(deleteFavGame(userId, wrongMongoId)).rejects.toThrow(FormatError)
      })
    })
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
