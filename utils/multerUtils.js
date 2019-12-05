const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
      cb(null, true)
    else cb(new Error('File type not supported'))
  },
  limits: {
    fileSize: 1024 * 1024 * 3
  }
}).array('images', 3)

module.exports = upload
