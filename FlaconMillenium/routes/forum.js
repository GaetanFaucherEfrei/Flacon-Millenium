const EXPRESS = require('express')
const COMMENT = require('../models/comment.model.js')
var Router = EXPRESS.Router()

global.results = null

Router.post('/comment', async (req, res) => {
  if (req.user) {
    new COMMENT({
      content: req.body.content,
      author: req.session.username,
      date: new Date()
    }).save()

    res.status(200).redirect('/forum/comment')
  } else {
    req.session.oldUrl = '/forum/comment'
    res.status(401).redirect('/user/login')
  }
})

Router.get('/comment', async (req, res) => {
  if (req.user) {
    COMMENT.find({}, function (err, result) {
      if (err) {
        res.send(err)
      } else {
        res.status(200).render('forum/forum', { data: result, name: req.user.username })
      }
    }).sort({ _id: -1 }).limit(10)
  } else {
    req.session.oldUrl = '/forum/comment'
    res.status(401).redirect('/user/login')
  }
})

module.exports = Router
