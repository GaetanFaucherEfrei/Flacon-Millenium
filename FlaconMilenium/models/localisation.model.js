const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var localisationSchema = new Schema({

})

const Localisation = mongoose.model('Localisation', localisationSchema)

module.exports = Localisation
