require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('./register-user')
const { mongoose, models: { User } } = require('@haakon/api-database')
const { ConflictError, FormatError } = require('@haakon/api-errors')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('registerUser', () => {
  before(() => mongoose.connect(MONGO_URL))

  beforeEach(() => User.deleteMany())

  it('should succeed when register new user', async () => {
    const name = 'Wendy Pan'
    const username = 'wendypan'
    const password = '123123123'

    const res = await registerUser(name, username, password)
    expect(res).to.be.undefined
    const user = await User.findOne({ username })
    expect(user).to.exist
    expect(user.name).to.equal(name)
    expect(user.username).to.equal(username)
    expect(bcrypt.compareSync(password, user.password)).to.be.true
  })

  describe('when user already exists', () => {
    let user

    beforeEach(() => {
      user = {
        name: 'Wendy Pan',
        username: 'wendypan',
        password: '123123123'
      }

      return User.create(user)
    })

    it('should fail when user already exists', async () => {
      const { name, username, password } = user

      try {
        await registerUser(name, username, password)

        throw new Error('should not reach this point')
      } catch (error) {
        expect(error).to.exist
        expect(error).to.be.instanceOf(ConflictError)
        expect(error.message).to.equal(`user with username ${username} already exists`)
      }
    })
  })

  describe('when parameters are not valid', () => {
    describe('when name is not valid', () => {
      it('should fail when name is not a string', () => {
        expect(() => registerUser(true, 'wendypan', '123123123')).to.throw(TypeError, 'name is not a string')
        expect(() => registerUser(123, 'wendypan', '123123123')).to.throw(TypeError, 'name is not a string')
        expect(() => registerUser({}, 'wendypan', '123123123')).to.throw(TypeError, 'name is not a string')
        expect(() => registerUser(() => { }, 'wendypan', '123123123')).to.throw(TypeError, 'name is not a string')
        expect(() => registerUser([], 'wendypan', '123123123')).to.throw(TypeError, 'name is not a string')
      })

      it('should fail when name is empty', () => {
        expect(() => registerUser('', 'wendypan', '123123123')).to.throw(FormatError, 'name is empty or blank')
        expect(() => registerUser('   ', 'wendypan', '123123123')).to.throw(FormatError, 'name is empty or blank')
      })

      it('should fail when name has spaces around', () => {
        expect(() => registerUser(' Wendy Pan ', 'wendypan', '123123123')).to.throw(FormatError, 'blank spaces around name')
      })
    })

    describe('when username is not valid', () => {
      it('should fail when username is not a string', () => {
        expect(() => registerUser('Wendy Pan', true, '123123123')).to.throw(TypeError, 'username is not a string')
        expect(() => registerUser('Wendy Pan', 123, '123123123')).to.throw(TypeError, 'username is not a string')
        expect(() => registerUser('Wendy Pan', {}, '123123123')).to.throw(TypeError, 'username is not a string')
        expect(() => registerUser('Wendy Pan', () => { }, '123123123')).to.throw(TypeError, 'username is not a string')
        expect(() => registerUser('Wendy Pan', [], '123123123')).to.throw(TypeError, 'username is not a string')
      })

      it('should fail when username is empty', () => {
        expect(() => registerUser('Wendy Pan', '', '123123123')).to.throw(FormatError, 'username is empty or blank')
        expect(() => registerUser('Wendy Pan', '   ', '123123123')).to.throw(FormatError, 'username is empty or blank')
      })

      it('should fail when username has spaces', () => {
        expect(() => registerUser('Wendy Pan', ' wendypan ', '123123123')).to.throw(FormatError, 'username has blank spaces')
        expect(() => registerUser('Wendy Pan', 'wendy pan', '123123123')).to.throw(FormatError, 'username has blank spaces')
      })

      it('should fail when username length is less that 4 characters', () => {
        expect(() => registerUser('Wendy Pan', 'wp', '123123123')).to.throw(FormatError, 'username has less than 4 characters')
      })
    })

    describe('when password is not valid', () => {
      it('should fail when password is not a string', () => {
        expect(() => registerUser('Wendy Pan', 'wendypan', true)).to.throw(TypeError, 'password is not a string')
        expect(() => registerUser('Wendy Pan', 'wendypan', 123)).to.throw(TypeError, 'password is not a string')
        expect(() => registerUser('Wendy Pan', 'wendypan', {})).to.throw(TypeError, 'password is not a string')
        expect(() => registerUser('Wendy Pan', 'wendypan', () => { })).to.throw(TypeError, 'password is not a string')
        expect(() => registerUser('Wendy Pan', 'wendypan', [])).to.throw(TypeError, 'password is not a string')
      })

      it('should fail when password is empty', () => {
        expect(() => registerUser('Wendy Pan', 'wendypan', '')).to.throw(FormatError, 'password is empty or blank')
        expect(() => registerUser('Wendy Pan', 'wendypan', '   ')).to.throw(FormatError, 'password is empty or blank')
      })

      it('should fail when password has spaces', () => {
        expect(() => registerUser('Wendy Pan', 'wendypan', ' 123123123 ')).to.throw(FormatError, 'password has blank spaces')
        expect(() => registerUser('Wendy Pan', 'wendypan', '123 123 123')).to.throw(FormatError, 'password has blank spaces')
      })

      it('should fail when password length is less that 8 characters', () => {
        expect(() => registerUser('Wendy Pan', 'wendypan', '123123')).to.throw(FormatError, 'password has less than 8 characters')
      })
    })
  })

  after(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
