const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var vinSchema = new Schema({

})

const Vin = mongoose.model('Vin', vinSchema)

module.exports = Vin
