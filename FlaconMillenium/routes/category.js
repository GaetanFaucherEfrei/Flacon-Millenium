const EXPRESS = require('express')
const CATEGORY = require('../models/category.model.js')
var Router = EXPRESS.Router()

global.results = null

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

Router.get('/list', async (req, res) => {
  try {
    if (req.user) {
      CATEGORY.find({}, function (error, result) {
        if (error) {
          // console.log('The unit did not exist.')
          res.status(404).send('Error : The list does not exist.')
        } else {
          // console.log('Result: ', result)
          var alert = req.session.alert
          req.session.alert = ''

          res.status(200).render('category/categoryList', { data: result, name: req.user.username, alert: alert })
          // res.send(JSON.stringify(result))
        }
      }).sort({ _id: -1 })
    } else {
    // console.log('User not identified.')
      req.session.oldUrl = req.originalUrl
      res.status(401).redirect('/user/login')
    }
  } catch (error) {
    console.log('There was an error with our server : ' + error)
    res.status(403).send('There was an error with our server.')
  }
})

Router.get('/unit', async (req, res) => {
  try {
    if (req.user) {
      if (typeof req.query.id === 'undefined') {
        // console.log('The unit did not exist.')
        res.status(404).send('Error : The unit did not exist.')
      } else {
        CATEGORY.findById({ _id: req.query.id }, function (error, result) {
          if (error) {
            // console.log('The unit did not exist.')
            res.status(404).send('Error : The unit does not exist.')
          } else {
            res.format({
              'text/html': function () {
                res.status(200).render('category/categoryView', { data: result, name: req.user.username })
              },

              'application/json': function () {
                res.status(200).send(result)
              },

              default: function () {
                res.status(200).render('category/categoryView', { data: result, name: req.user.username })
              }
            })
          }
        })
      }
    } else {
    // console.log('User not identified.')
      req.session.oldUrl = req.originalUrl
      res.status(401).redirect('/user/login')
    }
  } catch (error) {
    console.log('There was an error with our server : ' + error)
    res.status(520).send('There was an error with our server.')
  }
})

// to use with an ajax call
Router.post('/unit', async (req, res) => {
  try {
    if (req.user) {
      new CATEGORY({
        name: req.body.name,
        description: req.body.description
      }).save(function (error, result) {
        if (error) {
          console.log('Check the type of your entry :' + error)
          res.status(400).send('Check the type of your entry.')
        } else {
          // console.log('The post was succesfull.')
          res.status(200).send(result)
        }
      })
    } else {
    // console.log('User not identified.')
      req.session.oldUrl = '/category/list'
      res.status(401).redirect('/user/login')
    }
  } catch (error) {
    console.log('There was an error with our server : ' + error)
    res.status(520).send('There was an error with our server.')
  }
})

// to use with an ajax call
Router.patch('/unit', async (req, res) => {
  try {
    if (req.user) {
      CATEGORY.findByIdAndUpdate({ _id: req.body.id }, {
        $set: {
          name: req.body.name,
          description: req.body.description
        }
      }, function (error, result) {
        if (error) {
          // console.log('The unit did not exist.')
          res.status(404).send('Error : The unit did not exist.')
        } else {
          result.name = req.body.name
          result.description = req.body.description

          // console.log('The post was succesfull.')
          res.status(200).send(result)
        }
      })
    } else {
      // console.log('User not identified.')
      req.session.oldUrl = req.originalUrl + '?id=' + req.params.identification
      res.status(401).redirect('/user/login')
    }
  } catch (error) {
    console.log('There was an error with our server : ' + error)
    res.status(520).send('There was an error with our server.')
  }
})

// to use with an ajax call
Router.delete('/unit', async (req, res) => {
  try {
    if (req.user) {
      CATEGORY.findByIdAndDelete({ _id: req.body.id }, function (error, result) {
        if (error) {
          // console.log('The unit did not exist.')
          res.status(404).send('Error : The unit did not exist.')
        } else {
          // console.log('The delete was succesfull.')
          res.status(200).send(result)
        }
      })
    } else {
    // console.log('User not identified.')
      req.session.oldUrl = req.originalUrl + '?id=' + req.params.identification
      res.status(401).redirect('/user/login')
    }
  } catch (error) {
    console.log('There was an error with our server : ' + error)
    res.status(520).send('There was an error with our server.')
  }
})

module.exports = Router
