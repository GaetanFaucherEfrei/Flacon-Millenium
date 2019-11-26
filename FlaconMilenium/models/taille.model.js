const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var tailleSchema = new Schema({

})

const Taille = mongoose.model('Taille', tailleSchema)

module.exports = Taille
