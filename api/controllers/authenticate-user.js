const { authenticateUser } = require('@haakon/api-services')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/enviroment')

module.exports = async (req, res, next) => {
  const { body: { username, password } } = req

  try {
    const userId = await authenticateUser(username, password)

    const token = jwt.sign({ sub: userId, exp: Math.floor(Date.now() / 1000) + 3600 }, jwtSecret)

    res.json({ token })
  } catch (error) {
    next(error)
  }
}
