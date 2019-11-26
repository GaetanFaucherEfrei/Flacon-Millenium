const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var accompagnementSchema = new Schema({
  typePlat: { type: String, required: true },
  description: { type: String, required: false }
})

const Accompagnement = mongoose.model('Accompagnement', accompagnementSchema)

module.exports = Accompagnement
