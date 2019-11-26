const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "CEPAGE"
var vinCepageSchema = new Schema({
  IDcepage: { type: String, required: true },
  IDvin: { type: String, required: true }
})

const VinCepage = mongoose.model('VinCepage', vinCepageSchema)

module.exports = VinCepage
