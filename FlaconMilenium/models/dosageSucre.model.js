const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var dosageSucreSchema = new Schema({

})

const DosageSucre = mongoose.model('DosageSucre', dosageSucreSchema)

module.exports = DosageSucre
