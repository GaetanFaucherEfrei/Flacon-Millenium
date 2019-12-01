const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "CEPAGE"
var vinAccompagnementSchema = new Schema({
  IDaccompagnement: { type: String, required: true },
  IDvin: { type: String, required: true }
})

const vinAccompagnement = mongoose.model('vinAccompagnement', vinAccompagnementSchema)

module.exports = vinAccompagnement
