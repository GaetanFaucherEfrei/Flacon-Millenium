const mongoose = require('mongoose')
const Schema = mongoose.Schema

var sizeSchema = new Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  description: { type: String, required: false }
})

const Size = mongoose.model('Size', sizeSchema)

module.exports = Size
