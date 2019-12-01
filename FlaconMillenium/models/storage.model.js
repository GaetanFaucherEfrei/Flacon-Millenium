const mongoose = require('mongoose')
const Schema = mongoose.Schema

var storageSchema = new Schema({
  location: { type: String, required: true },
  name: { type: String, required: true },
  nbLigne: { type: Number, required: true },
  nbColone: { type: Number, required: true },
  nbPlace: { type: Number, required: true },
  description: { type: String, required: false }
})

const Storage = mongoose.model('Storage', storageSchema)

module.exports = Storage
