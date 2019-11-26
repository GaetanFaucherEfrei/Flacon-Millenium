const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var vinSchema = new Schema({
  nom: { type: String, required: true },
  millesime: { type: String, required: true },
  pourcentageAlcool: { type: String, required: true },
  bio: { type: Boolean, required: false },
  vielleVigne: { type: Boolean, required: false },
  futEnChene: { type: Boolean, required: false },
  dureConservation: { type: Date, required: false },
  temperatureConservation: { type: Number, required: false },
  dateConsomation: { type: Date, required: false },
  temperatureConsomation: { type: Number, required: false },
  commentaire: { type: String, required: false },
  IDproducteur: { type: String, required: true },
  IDcategorie: { type: String, required: true },
  IDappellation: { type: String, required: true }
})

const Vin = mongoose.model('Vin', vinSchema)

module.exports = Vin
