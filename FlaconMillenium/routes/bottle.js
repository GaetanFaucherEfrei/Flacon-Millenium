const EXPRESS = require('express')
const BOTTLE = require('../models/bottle.model.js')
const MONGOOSE = require('mongoose')
var Router = EXPRESS.Router()

global.results = null

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
