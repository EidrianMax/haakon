require('dotenv').config()
const { models: { User, Game }, mongoose } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('@haakon/api-errors')
const addFavGame = require('./add-fav-game')

const { MONGO_URL } = process.env

describe('toggleFavGame', () => {
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
      password: Math.random().toString(36).slice(2)
    }

    const userSaved = await User.create(user)

    userId = userSaved.id
  })

  it('should succed when add fav game', async () => {
    const favGames = await addFavGame(userId, gameId)

    expect(favGames).toBeInstanceOf(Array)
    expect(favGames).toHaveLength(1)

    const user = await User.findById(userId)
    expect(user.favGames[0].toString()).toBe(gameId)
  })

  it('should fail when user id do not exist', async () => {
    const falseUserId = new ObjectId().toString()

    try {
      await addFavGame(falseUserId, gameId)
      throw new Error('should not reach at this point')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`user with id ${falseUserId} not found`)
    }
  })

  it('should fail when game id do not exist', async () => {
    const falseGameId = new ObjectId().toString()

    try {
      await addFavGame(userId, falseGameId)
      throw new Error('should not reach at this point')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`game with id ${falseGameId} not found`)
    }
  })

  describe('when parameters are not valid', () => {
    describe('when user id is not valid', () => {
      it('should fail when id is not a string', async () => {
        await expect(addFavGame(true, gameId)).rejects.toThrow(TypeError)
        await expect(addFavGame(123, gameId)).rejects.toThrow(TypeError)
        await expect(addFavGame({}, gameId)).rejects.toThrow(TypeError)
        await expect(addFavGame(() => { }, gameId)).rejects.toThrow(TypeError)
        await expect(addFavGame([], gameId)).rejects.toThrow(TypeError)
      })

      it('should fail when id is empty or blank', async () => {
        await expect(addFavGame('', gameId)).rejects.toThrow(FormatError)
        await expect(addFavGame('   ', gameId)).rejects.toThrow(FormatError)
      })

      it('should fail when id has spaces', async () => {
        await expect(addFavGame(' abcd1234abcd1234abcd1234 ', gameId)).rejects.toThrow(FormatError)
        await expect(addFavGame('abcd 1234abc d1234abc d1234', gameId)).rejects.toThrow(FormatError)
      })

      it('should fail when id is not valid', async () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        await expect(addFavGame(wrongMongoId, gameId)).rejects.toThrow(FormatError)
      })
    })

    describe('when game id is not valid', () => {
      it('should fail when id is not a string', async () => {
        await expect(addFavGame(userId, true)).rejects.toThrow(TypeError)
        await expect(addFavGame(userId, 123)).rejects.toThrow(TypeError)
        await expect(addFavGame(userId, {})).rejects.toThrow(TypeError)
        await expect(addFavGame(userId, () => { })).rejects.toThrow(TypeError)
        await expect(addFavGame(userId, [])).rejects.toThrow(TypeError)
      })

      it('should fail when id is empty or blank', async () => {
        await expect(addFavGame(userId, '')).rejects.toThrow(FormatError)
        await expect(addFavGame(userId, '   ')).rejects.toThrow(FormatError)
      })

      it('should fail when id has spaces', async () => {
        await expect(addFavGame(userId, ' abcd1234abcd1234abcd1234 ')).rejects.toThrow(FormatError)
        await expect(addFavGame(userId, 'abcd 1234abc d1234abc d1234')).rejects.toThrow(FormatError)
      })

      it('should fail when id is not valid', async () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        await expect(addFavGame(userId, wrongMongoId)).rejects.toThrow(FormatError)
      })
    })
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
