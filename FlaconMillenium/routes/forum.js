const EXPRESS = require('express')
const COMMENT = require('../models/comment.model.js')
var Router = EXPRESS.Router()

/* ERROR CODE : https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
  200 : OK
  206 : Partial Content

  client:
    400 : Bad Request
    401 : Unauthorized
    403 : Forbidden
    404 : Not Found

  server:
    500 : Internal Server Error
    520 : Unknown Error
*/

Router.post('/comment', async (req, res) => {
  if (req.user) {
    new COMMENT({
      topic: req.body.topic,
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
