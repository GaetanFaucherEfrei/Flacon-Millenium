const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DEFINITION DU MODELE "VIN"
var accompagnementSchema = new Schema({

})

const Accompagnement = mongoose.model('Accompagnement', accompagnementSchema)

module.exports = Accompagnement
