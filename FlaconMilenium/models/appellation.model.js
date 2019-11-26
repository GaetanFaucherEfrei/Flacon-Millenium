const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var appellationSchema = new Schema({

})

const Appellation = mongoose.model('Appellation', appellationSchema)

module.exports = Appellation
