const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "CEPAGE"
var servitAvecSchema = new Schema({
  nomPlat: { type: String, required: true },
  description: { type: String, required: false },
  IDaccompagnement: { type: String, required: true }
})

const ServitAvec = mongoose.model('ServitAvec', servitAvecSchema)

module.exports = ServitAvec
