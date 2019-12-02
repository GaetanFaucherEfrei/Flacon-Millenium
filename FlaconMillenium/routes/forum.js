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

    // console.log('req.body.content', req.body.content)
    // console.log('req.body.author', req.body.author)

    res.redirect('/forum/comment')
  } else {
    res.redirect('/user/login')
  }
})

Router.get('/comment', async (req, res) => {
  if (req.user) {
    COMMENT.find({}, function (err, result) {
      if (err) {
        res.send(err)
      } else {
      // console.log('Result: ', result)
        res.render('forum', { data: result })
      // res.send(JSON.stringify(result))
      }
    }).sort({ _id: -1 }).limit(10)
  } else {
    res.redirect('/user/login')
  }
})

module.exports = Router
