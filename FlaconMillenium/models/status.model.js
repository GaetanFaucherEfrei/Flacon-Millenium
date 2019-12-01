const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var statusSchema = new Schema({
  nom: { type: String, required: true },
  description: { type: String, required: false }
})

const Status = mongoose.model('Status', statusSchema)

module.exports = Status
