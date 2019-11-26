const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "CEPAGE"
var imageSchema = new Schema({
  cheminAccess: { type: String, required: true }
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image
