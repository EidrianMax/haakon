require('dotenv').config()
const { expect } = require('chai')
const { mongoose, models: { User } } = require('@haakon/api-database')
const { NotFoundError, FormatError } = require('@haakon/api-errors')
const retrieveGame = require('./retrieve-game')

const { env: { MONGO_URL } } = process

describe('retrieveGame', () => {
  before(() => mongoose.connect(MONGO_URL))

  beforeEach(() => User.deleteMany())

  let user, userId

  beforeEach(async () => {
    user = {
      name: 'Wendy Pan',
      username: 'wendypan',
      password: '123123123'
    }

    const _user = await User.create(user)
    userId = _user.id
  })

  it('should succeed when found correct game', async () => {
    const gameId = '61f953b5c7c1cf74c3abf357'

    const game = await retrieveGame(gameId, userId)

    const { id, name, description, released, backgroundImage, screenshots, platforms, genres, score, website, isFav } = game

    expect(game).to.exist
    expect(game).to.be.a('object')
    expect(game).to.have.all.keys(
      'id',
      'name',
      'description',
      'released',
      'backgroundImage',
      'screenshots',
      'platforms',
      'genres',
      'score',
      'website',
      'isFav')
    expect(id).to.equal(gameId)
    expect(id).to.to.be.a('string')
    expect(name).to.to.be.a('string')
    expect(description).to.to.be.a('string')
    expect(released).to.to.be.a('string')
    expect(backgroundImage).to.to.be.a('string')
    expect(screenshots).to.be.an('array')
    expect(screenshots).to.be.instanceOf(Array)
    expect(platforms).to.be.an('array')
    expect(platforms).to.be.instanceOf(Array)
    expect(genres).to.be.an('array')
    expect(genres).to.be.instanceOf(Array)
    expect(score).to.be.a('number')
    expect(website).to.be.a('string')
    expect(isFav).to.be.a('boolean')
  })

  it('should fail when doesn\'t found any game', async () => {
    const wrongGameId = '61b8d030168b2213c7cc367e'

    try {
      await retrieveGame(wrongGameId, userId)
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).to.exist
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal(`game with id ${wrongGameId} not found`)
    }
  })

  it('should fail when the user doesn\'t exist', async () => {
    const gameId = '61f953b5c7c1cf74c3abf357'
    const wrongUserId = '61f953b5c7c1cf74c3abf357'

    try {
      await retrieveGame(gameId, wrongUserId)
      throw new Error('should not reach this point')
    } catch (error) {
      expect(error).to.exist
      expect(error).to.be.instanceOf(NotFoundError)
      expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
    }
  })

  describe('should fail when gameId is not valid', () => {
    it('when query is not a string', () => {
      expect(() => retrieveGame(123)).to.throw(TypeError, 'id is not a string')
      expect(() => retrieveGame(true)).to.throw(TypeError, 'id is not a string')
      expect(() => retrieveGame([])).to.throw(TypeError, 'id is not a string')
      expect(() => retrieveGame({})).to.throw(TypeError, 'id is not a string')
    })

    it('should fail when gameId is empty or blank', () => {
      expect(() => retrieveGame('')).to.throw(FormatError, 'id is empty or blank')
      expect(() => retrieveGame('   ')).to.throw(FormatError, 'id is empty or blank')
    })

    it('should fail when gameId has spaces', () => {
      expect(() => retrieveGame(' abcd1234abcd1234abcd1234 ')).to.throw(FormatError, 'id has blank spaces')
      expect(() => retrieveGame('abcd 1234abc d1234abc d1234')).to.throw(FormatError, 'id has blank spaces')
    })

    it('should fail when gameId is not valid', () => {
      const wrongMongoId = '61b8d031158b2213c7cc37b'
      expect(() => retrieveGame(wrongMongoId)).to.throw(FormatError, 'id is not valid')
    })
  })

  describe('should fail when userId is not valid', () => {
    const gameId = '61f953b5c7c1cf74c3abf357'

    it('when query is not a string', () => {
      expect(() => retrieveGame(gameId, 123)).to.throw(TypeError, 'id is not a string')
      expect(() => retrieveGame(gameId, true)).to.throw(TypeError, 'id is not a string')
      expect(() => retrieveGame(gameId, [])).to.throw(TypeError, 'id is not a string')
      expect(() => retrieveGame(gameId, {})).to.throw(TypeError, 'id is not a string')
    })

    it('should fail when userId is empty or blank', () => {
      expect(() => retrieveGame(gameId, '')).to.throw(FormatError, 'id is empty or blank')
      expect(() => retrieveGame(gameId, '   ')).to.throw(FormatError, 'id is empty or blank')
    })

    it('should fail when userId has spaces', () => {
      expect(() => retrieveGame(gameId, ' abcd1234abcd1234abcd1234 ')).to.throw(FormatError, 'id has blank spaces')
      expect(() => retrieveGame(gameId, 'abcd 1234abc d1234abc d1234')).to.throw(FormatError, 'id has blank spaces')
    })

    it('should fail when userId is not valid', () => {
      const wrongMongoId = '61b8d031158b2213c7cc37b'
      expect(() => retrieveGame(gameId, wrongMongoId)).to.throw(FormatError, 'id is not valid')
    })
  })

  after(() =>
    mongoose.disconnect()
  )
})
