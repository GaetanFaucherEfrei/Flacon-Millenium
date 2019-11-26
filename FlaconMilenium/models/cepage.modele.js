const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "CEPAGE"
var cepageSchema = new Schema({

})

const Cepage = mongoose.model('Cepage', cepageSchema)

module.exports = Cepage
