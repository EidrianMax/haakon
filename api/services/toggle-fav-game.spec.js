require('dotenv').config()
const { expect } = require('chai')
const { models: { User }, mongoose } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('@haakon/api-errors')
const toggleFavGame = require('./toggle-fav-game')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('toggleFavGame', () => {
  before(() => mongoose.connect(MONGO_URL))

  let user, userId
  const gameId = '61f953b5c7c1cf74c3abf357'
  const wrongGameId = '61bc811ecddacb88947a1b26'
  const wrongUserId = '61b8d030158b2213c7cc36ba'

  describe('Happy Path', () => {
    beforeEach(async () => {
      user = {
        name: 'Wendy Pan',
        username: 'wendypan',
        password: '123123123'
      }

      const _user = await User.create({ ...user, password: bcrypt.hashSync(user.password) })
      userId = _user.id
    })

    it('should succeed when an agregate one fav game to user', async () => {
      const res = await toggleFavGame(userId, gameId)
      expect(res).to.be.undefined
      const _user = await User.findById(userId)
      _user.favGames.forEach(id => {
        expect(id).to.be.instanceOf(ObjectId)
        const _id = id.toString()
        expect(_id).to.equal(gameId)
      })
    })
  })

  describe('Other Happy Path', () => {
    beforeEach(async () => {
      user = {
        name: 'Wendy Pan',
        username: 'wendypan',
        password: '123123123'
      }

      const _user = await User.create({ ...user, password: bcrypt.hashSync(user.password) })
      userId = _user.id

      await toggleFavGame(userId, gameId)
    })

    // Cuando solo hay un fav y el array queda vacio
    it('should succeed when an eliminate one fav game to user', async () => {
      const res = await toggleFavGame(userId, gameId)
      expect(res).to.be.undefined
      const _user = await User.findById(userId)
      expect(_user.favGames).to.be.instanceOf(Array)
      expect(_user.favGames.length).to.be.equal(0)
    })
  })

  describe('Unhappy Path', () => {
    it('When the id of the game doesn\'t exist', async () => {
      try {
        await toggleFavGame(userId, wrongGameId)
        throw new Error('shouldn\'t reach here')
      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.instanceOf(NotFoundError)
        expect(error.message).to.be.equal(`game with id ${wrongGameId} not found`)
      }
    })

    it('When the user doesn\'t exist', async () => {
      try {
        await toggleFavGame(wrongUserId, gameId)
        throw new Error('shouldn\'t reach here')
      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.instanceOf(NotFoundError)
        expect(error.message).to.be.equal(`user with id ${wrongUserId} not found`)
      }
    })
  })

  afterEach(async () => {
    await User.deleteMany()
  })

  after(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
