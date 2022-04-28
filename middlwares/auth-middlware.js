const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
  try {
    const authorizationHeade = req.headers.authorization
    if (!authorizationHeade) {
      return next(ApiError.UnathorizedError())
    }
    const accessToken = authorizationHeade.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnathorizedError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnathorizedError())
    }
    req.user = userData
    next()
  } catch (e) {
    return next(ApiError.UnathorizedError())
  }
}
