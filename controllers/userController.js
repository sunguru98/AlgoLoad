const User = require('../models/User')
const { validationResult } = require('express-validator')

module.exports = {
  // Register a new User
  async registerUser(req, res) {
    try {
      // Checking errors on the request side
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res.status(400).send({
          statusCode: 400,
          message: errors.array().map(err => ({ [err.param]: err.msg }))
        })
      const { name, email, password } = req.body

      // Checking the db whether email already exists
      const checkUser = await User.findOne({ email })
      if (checkUser)
        return res
          .status(400)
          .send({
            statusCode: 400,
            message: [{ email: 'Email already exists' }]
          })

      // Creating the user and assigning an access token
      const user = new User({ name, email, password })
      const accessToken = await user.generateAccessToken()
      return res.status(201).send({
        statusCode: 201,
        user,
        accessToken: `Bearer ${accessToken}`,
        expiresIn: '24h'
      })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Sign in user
  async signInUser(req, res) {
    try {
      // Checking errors on the request side
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return res.status(400).send({
          statusCode: 400,
          message: errors.array().map(err => ({ [err.param]: err.msg }))
        })
      const { email, password } = req.body

      // Finding User details with respect to email and password
      const user = await User.findByEmailAndPassword(email, password)
      if (!user)
        return res
          .status(401)
          .send({ statusCode: 401, message: 'Incorrect Credentials' })

      // Assigning Access Token
      const accessToken = await user.generateAccessToken()
      return res.status(200).send({
        statusCode: 200,
        user,
        accessToken: `Bearer ${accessToken}`,
        expiresIn: '24h'
      })
    } catch (err) {
      if (err.message === 'Incorrect credentials')
        return res
          .status(401)
          .send({ statusCode: 401, message: 'Incorrect Credentials' })
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  },

  // Log out user
  async signOutUser(req, res) {
    try {
      const user = req.user
      user.accessToken = null
      await user.save()
      res
        .status(202)
        .send({ statusCode: 202, message: 'Logged out successfully' })
    } catch (err) {
      res.status(500).send({ statusCode: 500, message: 'Server Error' })
    }
  }
}
