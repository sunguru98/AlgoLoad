const { Router } = require('express')
const router = new Router()
const authenticate = require('../middleware/authenticate')
const { uploadImage } = require('../controllers/imageController')

// @route - POST /api/image/
// @desc - Upload an image
// @auth - Auth Middleware
router.post('/', authenticate, uploadImage)

module.exports = router
