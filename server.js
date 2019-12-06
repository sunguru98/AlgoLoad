const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

require('./db')
require('./utils/awsS3')

const app = express()
const PORT = process.env.PORT || 9998
app.use(express.json())

if (process.env.NODE_ENV === 'development') app.use(require('morgan')('dev'))

// All Routes
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/image', require('./routes/imageRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (_, res) => {
    return res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log('Server listening on PORT', PORT))
