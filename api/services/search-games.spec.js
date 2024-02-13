require('dotenv').config()
const { mongoose } = require('@haakon/api-database')
const { NotFoundError, FormatError } = require('@haakon/api-errors')
const searchGames = require('./search-games')

const { MONGO_URL } = process.env

describe('searchGames', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URL)
  })

  it('should succeed when found correct games', async () => {
    const query = 'grand'

    const games = await searchGames(query)

    games.forEach(game => {
      const { name, backgroundImage, platforms, genres, score } = game

      expect(name.toLowerCase()).toMatch(query.toLowerCase())
      expect(name).toBeDefined()
      expect(backgroundImage).toBeDefined()
      expect(platforms).toBeDefined()
      expect(genres).toBeDefined()
      expect(score).toBeDefined()
    })
  })

  it('should fail with doesn\'t found any game', async () => {
    const query = 'grandtheft'

    try {
      await searchGames(query)
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe('no game found with that match')
    }
  })

  describe('when parameter are not valid', () => {
    describe('when query is not valid', () => {
      it('should fail when query is not a string', async () => {
        await expect(searchGames(true)).rejects.toThrow(TypeError)
        await expect(searchGames(123)).rejects.toThrow(TypeError)
        await expect(searchGames({})).rejects.toThrow(TypeError)
        await expect(searchGames(() => { })).rejects.toThrow(TypeError)
        await expect(searchGames([])).rejects.toThrow(TypeError)
      })

      it('should fail when query is empty or blank', async () => {
        await expect(searchGames('')).rejects.toThrow(FormatError)
        await expect(searchGames('   ')).rejects.toThrow(FormatError)
      })
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
})
