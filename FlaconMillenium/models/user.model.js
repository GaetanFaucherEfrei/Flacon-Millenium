const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  confirmStatus: {type: Number, required: true},
  comfirmationCode: {type: Number, required: true}
})

const User = mongoose.model('User', userSchema)

module.exports = User
