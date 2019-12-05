const { Schema, model } = require('mongoose')
const { sign } = require('jsonwebtoken')
const { compare, hash } = require('bcryptjs')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  accessToken: String,
  datas: [
    {
      location: String,
      key: String,
      textContent: String
    }
  ]
})

userSchema.methods = {
  // Deleting the password and unnecessary data before sending back
  toJSON: function() {
    const user = this.toObject()
    delete user.__v
    delete user.password
    delete user.accessToken
    return user
  },

  // Generate Access Token (JWT)
  generateAccessToken: async function() {
    const user = this
    const accessToken = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })
    user.accessToken = accessToken
    await user.save()
    return accessToken
  }
}

userSchema.statics = {
  // Useful for signing in
  findByEmailAndPassword: async (email, password) => {
    try {
      const user = await User.findOne({ email })
      if (!user) throw 'Incorrect Credentials'
      const isMatched = await compare(password, user.password)
      if (!isMatched) throw 'Incorrect Credentials'
      return user
    } catch (err) {
      throw new Error('Incorrect credentials')
    }
  }
}

// Database middleware
userSchema.pre('save', async function(next) {
  // If the password is changed means hash it.
  // This avoids hashing the already hashed password
  if (this.isModified('password')) {
    const password = await hash(this.password, 10)
    this.password = password
  }
  next()
})

const User = model('user', userSchema)
module.exports = User
