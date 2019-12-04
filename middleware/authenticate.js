const User = require('../models/User')
const { verify } = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
  try {
    let accessToken = req.header('Authorization')
    if (!accessToken) throw new Error('No access token')
    accessToken = accessToken.replace('Bearer ', '')
    const payload = verify(accessToken, process.env.JWT_SECRET)
    if (!payload) throw new Error('jwt expired')
    const user = await User.findOne({ _id: payload.id, accessToken })
    if (!user) throw new Error('No user')
    req.user = user
    req.accessToken = accessToken
    next()
  } catch (err) {
    console.log(err.message)
    res.status(401).send({ statusCode: 401, message: 'Incorrect Credentials' })
  }
}

module.exports = authenticate
