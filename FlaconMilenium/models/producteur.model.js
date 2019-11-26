const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var producteurSchema = new Schema({

})

const Producteur = mongoose.model('Producteur', producteurSchema)

module.exports = Producteur
