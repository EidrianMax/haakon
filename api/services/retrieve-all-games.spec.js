require('dotenv').config()
const { mongoose, models: { Game } } = require('@haakon/api-database')
const retrieveAllGames = require('./retrieve-all-games')

const { MONGO_URL } = process.env

describe('retrieveAllGames', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URL)
  })

  it('should succed when retrieve all games', async () => {
    const countGames = await Game.countDocuments()

    const games = await retrieveAllGames()

    expect(games).toBeInstanceOf(Array)
    expect(games.length).toBe(countGames)

    games.forEach(game => {
      expect(game.id).toBeDefined()
      expect(typeof game.id).toBe('string')
      expect(typeof game.name).toBe('string')
      expect(typeof game.backgroundImage).toBe('string')
      expect(game.platforms).toBeInstanceOf(Array)
      expect(game.genres).toBeInstanceOf(Array)
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
})
