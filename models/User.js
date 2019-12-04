const { Schema, model } = require('mongoose')

const userSchema = new Schema()
const User = model('user', userSchema)

module.exports = User