require('dotenv').config()
const { expect } = require('chai')
const unregisterUser = require('./unregister-user')
const { mongoose, models: { User } } = require('@haakon/api-database')
const { Types: { ObjectId } } = mongoose
const { CredentialsError, FormatError, NotFoundError } = require('@haakon/api-errors')
const { env: { MONGO_URL } } = process
const bcrypt = require('bcryptjs')

describe('unregisterUser', () => {
  before(() => mongoose.connect(MONGO_URL))

  beforeEach(() => User.deleteMany())

  let user, userId

  beforeEach(async () => {
    user = {
      name: 'Wendy Pan',
      username: 'wendypan',
      password: '123123123'
    }

    const _user = await User.create({ ...user, password: bcrypt.hashSync(user.password) })
    return userId = _user.id
  })

  describe('Happy Path', () => {
    it('Should succeed when user is deleted from data base', async () => {
      const { password } = user

      const res = await unregisterUser(userId, password)
      expect(res).to.equal('User deleted successfully')
    })
  })

  describe('Unhappy Path', () => {
    it('Should fail with wrong password', async () => {
      try {
        await unregisterUser(userId, '12345678')
        throw new Error('should not reach this point')
      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.instanceOf(CredentialsError)
        expect(error.message).to.equal('Wrong password')
      }
    })

    it('Should fail when user id does not correspond to any user', async () => {
      const userId = new ObjectId().toString()

      const { password } = user

      try {
        await unregisterUser(userId, password)
        throw new Error('should not reach this point')
      } catch (error) {
        expect(error).to.exist
        expect(error.message).to.equal(`user with id ${userId} not found`)
        expect(error).to.be.instanceOf(NotFoundError)
      }
    })
  })

  describe('When parameters are note valid', () => {
    describe('When id is not valid', () => {
      it('should fail when id is not a string', () => {
        expect(() => unregisterUser(true, {})).to.throw(TypeError, 'id is not a string')
        expect(() => unregisterUser(123, {})).to.throw(TypeError, 'id is not a string')
        expect(() => unregisterUser({}, {})).to.throw(TypeError, 'id is not a string')
        expect(() => unregisterUser(() => { }, {})).to.throw(TypeError, 'id is not a string')
        expect(() => unregisterUser([], {})).to.throw(TypeError, 'id is not a string')
      })

      it('should fail when id is empty or blank', () => {
        expect(() => unregisterUser('', {})).to.throw(FormatError, 'id is empty or blank')
        expect(() => unregisterUser('   ', {})).to.throw(FormatError, 'id is empty or blank')
      })

      it('should fail when id has spaces', () => {
        expect(() => unregisterUser(' abcd1234abcd1234abcd1234 ', {})).to.throw(FormatError, 'id has blank spaces')
        expect(() => unregisterUser('abcd 1234abc d1234abc d1234', {})).to.throw(FormatError, 'id has blank spaces')
      })

      it('should fail when id is not valid', () => {
        const wrongMongoId = '61b8d031158b2213c7cc37b'
        expect(() => unregisterUser(wrongMongoId)).to.throw(FormatError, 'id is not valid')
      })
    })

    describe('When password is not valid', () => {
      it('Should fail when password is not a string', () => {
        expect(() => unregisterUser(userId, true)).to.throw(TypeError, 'password is not a string')
        expect(() => unregisterUser(userId, 123)).to.throw(TypeError, 'password is not a string')
        expect(() => unregisterUser(userId, {})).to.throw(TypeError, 'password is not a string')
        expect(() => unregisterUser(userId, () => { })).to.throw(TypeError, 'password is not a string')
        expect(() => unregisterUser(userId, [])).to.throw(TypeError, 'password is not a string')
      })

      it('Should fail when password is empty', () => {
        expect(() => unregisterUser(userId, '')).to.throw(FormatError, 'password is empty or blank')
        expect(() => unregisterUser(userId, '   ')).to.throw(FormatError, 'password is empty or blank')
      })

      it('Should fail when password has spaces around', () => {
        expect(() => unregisterUser(userId, ' 123123123 ')).to.throw(FormatError, 'password has blank spaces')
        expect(() => unregisterUser(userId, '1231 23123')).to.throw(FormatError, 'password has blank spaces')
      })

      it('Should fail when password length is less than 8 characters', () => {
        expect(() => unregisterUser(userId, '1231')).to.throw(FormatError, 'password has less than 8 characters')
      })
    })
  })

  after(() =>
    User.deleteMany()
      .then(() => mongoose.disconnect())
  )
})
