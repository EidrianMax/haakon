require('dotenv').config()
const { models: { User, Game }, mongoose } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('@haakon/api-errors')
const addGameInUser = require('./add-game-in-user')

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
    const property = 'favGames'

    const favGames = await addGameInUser(property, userId, gameId)

    expect(favGames).toBeInstanceOf(Array)
    expect(favGames).toHaveLength(1)

    const user = await User.findById(userId)
    expect(user[property][0].toString()).toBe(gameId)
  })

  it('should succed when add played game', async () => {
    const property = 'playedGames'

    const playedGames = await addGameInUser(property, userId, gameId)

    expect(playedGames).toBeInstanceOf(Array)
    expect(playedGames).toHaveLength(1)

    const user = await User.findById(userId)
    expect(user[property][0].toString()).toBe(gameId)
  })

  it('should succed when add played game', async () => {
    const property = 'playingGames'

    const playingGames = await addGameInUser(property, userId, gameId)

    expect(playingGames).toBeInstanceOf(Array)
    expect(playingGames).toHaveLength(1)

    const user = await User.findById(userId)
    expect(user[property][0].toString()).toBe(gameId)
  })

  it('should fail when user id do not exist', async () => {
    const property = 'favGames'
    const falseUserId = new ObjectId().toString()

    try {
      await addGameInUser(property, falseUserId, gameId)
      throw new Error('should not reach at this point')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`user with id ${falseUserId} not found`)
    }
  })

  it('should fail when game id do not exist', async () => {
    const property = 'favGames'
    const falseGameId = new ObjectId().toString()

    try {
      await addGameInUser(property, userId, falseGameId)
      throw new Error('should not reach at this point')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`game with id ${falseGameId} not found`)
    }
  })

  describe('when parameters are not valid', () => {
    const property = 'favGames'

    describe('when property is not valid', () => {
      it('should fail when property is not a string', async () => {
        await expect(addGameInUser(true, property, gameId)).rejects.toThrow(TypeError)
        await expect(addGameInUser(123, property, gameId)).rejects.toThrow(TypeError)
        await expect(addGameInUser({}, property, gameId)).rejects.toThrow(TypeError)
        await expect(addGameInUser(() => { }, property, gameId)).rejects.toThrow(TypeError)
        await expect(addGameInUser([], property, gameId)).rejects.toThrow(TypeError)
      })

      it('should fail when property is empty or blank', async () => {
        await expect(addGameInUser('', property, gameId)).rejects.toThrow(FormatError)
        await expect(addGameInUser('   ', property, gameId)).rejects.toThrow(FormatError)
      })

      it('should fail when property has spaces', async () => {
        await expect(addGameInUser(' abcd1234abcd1234abcd1234 ', property, gameId)).rejects.toThrow(FormatError)
        await expect(addGameInUser('abcd 1234abc d1234abc d1234', property, gameId)).rejects.toThrow(FormatError)
      })
    })

    describe('when user id is not valid', () => {
      it('should fail when id is not a string', async () => {
        await expect(addGameInUser(property, true, gameId)).rejects.toThrow(TypeError)
        await expect(addGameInUser(property, 123, gameId)).rejects.toThrow(TypeError)
        await expect(addGameInUser(property, {}, gameId)).rejects.toThrow(TypeError)
        await expect(addGameInUser(property, () => { }, gameId)).rejects.toThrow(TypeError)
        await expect(addGameInUser(property, [], gameId)).rejects.toThrow(TypeError)
      })

      it('should fail when id is empty or blank', async () => {
        await expect(addGameInUser(property, '', gameId)).rejects.toThrow(FormatError)
        await expect(addGameInUser(property, '   ', gameId)).rejects.toThrow(FormatError)
      })

      it('should fail when id has spaces', async () => {
        await expect(addGameInUser(property, ' abcd1234abcd1234abcd1234 ', gameId)).rejects.toThrow(FormatError)
        await expect(addGameInUser(property, 'abcd 1234abc d1234abc d1234', gameId)).rejects.toThrow(FormatError)
      })

      it('should fail when id is not valid', async () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        await expect(addGameInUser(property, wrongMongoId, gameId)).rejects.toThrow(FormatError)
      })
    })

    describe('when game id is not valid', () => {
      it('should fail when id is not a string', async () => {
        await expect(addGameInUser(property, userId, true)).rejects.toThrow(TypeError)
        await expect(addGameInUser(property, userId, 123)).rejects.toThrow(TypeError)
        await expect(addGameInUser(property, userId, {})).rejects.toThrow(TypeError)
        await expect(addGameInUser(property, userId, () => { })).rejects.toThrow(TypeError)
        await expect(addGameInUser(property, userId, [])).rejects.toThrow(TypeError)
      })

      it('should fail when id is empty or blank', async () => {
        await expect(addGameInUser(property, userId, '')).rejects.toThrow(FormatError)
        await expect(addGameInUser(property, userId, '   ')).rejects.toThrow(FormatError)
      })

      it('should fail when id has spaces', async () => {
        await expect(addGameInUser(property, userId, ' abcd1234abcd1234abcd1234 ')).rejects.toThrow(FormatError)
        await expect(addGameInUser(property, userId, 'abcd 1234abc d1234abc d1234')).rejects.toThrow(FormatError)
      })

      it('should fail when id is not valid', async () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        await expect(addGameInUser(property, userId, wrongMongoId)).rejects.toThrow(FormatError)
      })
    })
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
