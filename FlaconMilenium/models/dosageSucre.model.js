const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var dosageSucreSchema = new Schema({
  nom: { type: String, required: true },
  dosage: { type: Number, required: true },
  description: { type: String, required: true }
})

const DosageSucre = mongoose.model('DosageSucre', dosageSucreSchema)

module.exports = DosageSucre
