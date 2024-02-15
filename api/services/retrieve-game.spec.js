require('dotenv').config()
const { mongoose, models: { Game } } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('@haakon/api-errors')
const retrieveGame = require('./retrieve-game')

const { MONGO_URL } = process.env

describe('retrieveGame', () => {
  let gameId

  beforeAll(async () => {
    await mongoose.connect(MONGO_URL)
  })

  beforeEach(async () => {
    const games = await Game.find({})

    gameId = games[0].id
  })

  it('should succeed when found correct game', async () => {
    const game = await retrieveGame(gameId)

    expect(game.id).toBeDefined()
    expect(game.name).toBeDefined()
    expect(game.description).toBeDefined()
    expect(game.backgroundImage).toBeDefined()
    expect(game.backgroundImage).toBeDefined()
    expect(game.screenshots).toBeDefined()
    expect(game.platforms).toBeDefined()
    expect(game.genres).toBeDefined()
  })

  it('should fail when doesn\'t found any game', async () => {
    const wrongGameId = new ObjectId().toString()

    try {
      await retrieveGame(wrongGameId)
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe(`game with id ${wrongGameId} not found`)
    }
  })

  describe('should fail when gameId is not valid', () => {
    it('when gameId is not a string', async () => {
      await expect(retrieveGame(123)).rejects.toThrow(TypeError)
      await expect(retrieveGame(true)).rejects.toThrow(TypeError)
      await expect(retrieveGame([])).rejects.toThrow(TypeError)
      await expect(retrieveGame({})).rejects.toThrow(TypeError)
    })

    it('should fail when gameId is empty or blank', async () => {
      await expect(retrieveGame('')).rejects.toThrow(FormatError)
      await expect(retrieveGame('   ')).rejects.toThrow(FormatError)
    })

    it('should fail when gameId has spaces', async () => {
      await expect(retrieveGame(' abcd1234abcd1234abcd1234 ')).rejects.toThrow(FormatError)
      await expect(retrieveGame('abcd 1234abc d1234abc d1234')).rejects.toThrow(FormatError)
    })

    it('should fail when gameId is not valid', async () => {
      const wrongMongoId = '61b8d031158b2213c7cc37b'
      await expect(retrieveGame(wrongMongoId)).rejects.toThrow(FormatError)
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
})
