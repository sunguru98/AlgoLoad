const { Router } = require('express')
const router = new Router()
const {
  signInUser,
  signOutUser,
  registerUser,
  fetchUser
} = require('../controllers/userController')
const authenticate = require('../middleware/authenticate')
const { check } = require('express-validator')

// @route - POST /api/user/regiser
// @desc - Registers a user
// @auth - Public
router.post(
  '/register',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('email', 'Email is Invalid').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty(),
    check('password', 'Password length must be minimum 8 characters').isLength({
      min: 8
    })
  ],
  registerUser
)

// @route - POST /api/user/signin
// @desc - Login an user
// @auth - Public
router.post('/signin', signInUser)

// @route - DELETE /api/user/logout
// @desc - Logout a user
// @auth - Private (Auth middleware)
router.delete('/logout', authenticate, signOutUser)

// @route - GET /api/user
// @desc -  Fetch Current User
// @auth - Private (Auth middleware)
router.get('/', authenticate, fetchUser)

module.exports = router
