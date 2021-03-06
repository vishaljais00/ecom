const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minlength: [2, 'name should not be smaller then 2 character'],
    maxlength: [64, 'name should not be greater then 64 character']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    maxlength: [128, 'email should not be greater then 128 character'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamp: true
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('Users', userSchema)

module.exports = User
