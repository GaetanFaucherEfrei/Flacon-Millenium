const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Forum')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: true }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
