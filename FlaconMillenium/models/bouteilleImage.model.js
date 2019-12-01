const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "CEPAGE"
var bouteilleImageSchema = new Schema({
  IDimage: { type: String, required: true },
  IDbouteille: { type: String, required: true }
})

const BouteilleImage = mongoose.model('BouteilleImage', bouteilleImageSchema)

module.exports = BouteilleImage
