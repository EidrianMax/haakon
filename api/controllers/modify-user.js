const { modifyUser } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = (req, res, next) => {
  const { headers: { authorization }, body: data } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    modifyUser(id, data)
      .then(() => res.status(204).send())
      .catch(next)
  } catch (error) {
    next(error)
  }
}
