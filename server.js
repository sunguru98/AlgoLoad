const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

require('./db')

const app = express()
const PORT = process.env.PORT || 9998
app.use(express.json())

if (process.env.NODE_ENV === 'production')
  app.use(express.static(path.join(__dirname, 'build')))

// All Routes

if (process.env.NODE_ENV === 'production') {
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log('Server listening on PORT ', PORT))
