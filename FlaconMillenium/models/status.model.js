const mongoose = require('mongoose')
const Schema = mongoose.Schema

var statusSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false }
})

const Status = mongoose.model('Status', statusSchema)

module.exports = Status
