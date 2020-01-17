const mongoose = require('mongoose')
const Schema = mongoose.Schema

var producerSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  region: { type: String, required: false },
  country: { type: String, required: false },
  comment: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  website: { type: String, required: false }
})

const Producer = mongoose.model('Producer', producerSchema)

module.exports = Producer
