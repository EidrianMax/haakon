const { retrieveUser } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res, next) => {
  const { headers: { authorization } } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    retrieveUser(id)
      .then(user => res.json(user))
      .catch(next)
  } catch (error) {
    next(error)
  }
}
