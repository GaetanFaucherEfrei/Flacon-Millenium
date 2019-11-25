const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Forum')

const Schema = mongoose.Schema

const CommentaireSchema = new Schema({
  content: { type: String, required: true },
  auteur: { type: String, required: true }
})

const Commentaire = mongoose.model('Commentaire', CommentaireSchema)

module.exports = Commentaire
