const { authenticateUser } = require('@haakon/api-services')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

module.exports = (req, res, next) => {
  const { body: { username, password } } = req

  try {
    authenticateUser(username, password)
      .then(id => {
        const token = jwt.sign({ sub: id, exp: Math.floor(Date.now() / 1000) + 3600 }, JWT_SECRET)

        res.json({ token })
      })
      .catch(next)
  } catch (error) {
    next(error)
  }
}
