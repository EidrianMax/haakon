const { authenticateUser } = require('logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const { handleError } = require('./helpers')

module.exports = (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id, exp: Math.floor(Date.now() / 1000) + 3600 }, SECRET)

                res.json({ token })
            })
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}