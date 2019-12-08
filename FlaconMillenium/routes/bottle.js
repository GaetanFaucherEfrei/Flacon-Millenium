const EXPRESS = require('express')
const BOTTLE = require('../models/bottle.model.js')
const MONGOOSE = require('mongoose')
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

Router.post('/add', async (req, res) => {
  if (req.user) {

  } else {
    req.session.oldUrl = '/bottle/add'
    res.redirect('/user/login')
  }
})

Router.get('/view', async (req, res) => {
  if (req.user) {

  } else {
    req.session.oldUrl = '/bottle/view'
    res.redirect('/user/login')
  }
})

module.exports = Router
