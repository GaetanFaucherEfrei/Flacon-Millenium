const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var appellationSchema = new Schema({
  nom: { type: String, required: true },
  description: { type: String, required: false }
})

const Appellation = mongoose.model('Appellation', appellationSchema)

module.exports = Appellation
