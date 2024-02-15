const { retrieveUser } = require('@haakon/api-services')
const { validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res, next) => {
  const { headers: { authorization } } = req

  try {
    const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

    const user = await retrieveUser(id)

    // TODO refactor when convert to monorepo
    res.json({
      name: user.name,
      username: user.username
    })
  } catch (error) {
    next(error)
  }
}
