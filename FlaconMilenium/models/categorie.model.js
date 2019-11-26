const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var categorieSchema = new Schema({

})

const Categorie = mongoose.model('Categorie', categorieSchema)

module.exports = Categorie
