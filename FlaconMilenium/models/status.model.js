const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var statusSchema = new Schema({

})

const Status = mongoose.model('Status', statusSchema)

module.exports = Status
