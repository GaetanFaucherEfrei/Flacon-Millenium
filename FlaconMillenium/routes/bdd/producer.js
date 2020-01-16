const EXPRESS = require('express')
const PRODUCER = require('../../models/producer.model.js')

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

Router.get('/list', async (req, res) => {
  try {
    if (req.user) {
      PRODUCER.find({}, function (error, result) {
        if (error) {
          // console.log('The producer did not exist.')
          notFound(req, res, 0)
        } else {
          // console.log('Result: ', result)
          var alert = req.session.alert
          req.session.alert = ''

          res.status(200).render('producer/producerList', { data: result, name: req.user.username, alert: alert })
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
        // console.log('The producer did not exist.')
        notFound(req, res, 0)
      } else {
        PRODUCER.findById({ _id: req.query.id }, function (error, result) {
          if (error) {
            // console.log('The producer did not exist.')
            notFound(req, res, 1)
          } else {
            if (result) {
              res.format({
                'text/html': function () {
                  res.status(200).render('producer/producerView', { data: result, name: req.user.username })
                },

                'application/json': function () {
                  res.status(200).send(result)
                },

                default: function () {
                  res.status(200).render('producer/producerView', { data: result, name: req.user.username })
                }
              })
            } else {
              notFound(req, res, 1)
            }
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
      new PRODUCER({
        name: req.body.name,
        address: req.body.address,
        region: req.body.region,
        country: req.body.country,
        comment: req.body.comment,
        phone: req.body.phone,
        email: req.body.email,
        website: req.body.website
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
      req.session.oldUrl = '/producer/list'
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
      PRODUCER.findByIdAndUpdate({ _id: req.body.id }, {
        $set: {
          name: req.body.name,
          address: req.body.address,
          region: req.body.region,
          country: req.body.country,
          comment: req.body.comment,
          phone: req.body.phone,
          email: req.body.email,
          website: req.body.website
        }
      }, function (error, result) {
        if (error) {
          // console.log('The producer did not exist.')
          notFound(req, res, 1)
        } else {
          if (result) {
            result.name = req.body.name
            result.address = req.body.address
            result.region = req.body.region
            result.country = req.body.country
            result.comment = req.body.comment
            result.phone = req.body.phone
            result.email = req.body.email
            result.website = req.body.website

            // console.log('The post was succesfull.')
            res.status(200).send(result)
          } else {
            notFound(req, res, 1)
          }
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
      PRODUCER.findByIdAndDelete({ _id: req.body.id }, function (error, result) {
        if (error) {
          // console.log('The producer did not exist.')
          notFound(req, res, 1)
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

function notFound (req, res, alert) {
  res.format({
    'text/html': function () {
      if (alert) {
        req.session.alert = 'Error : The producer was not found.'
      }
      res.status(404).redirect('/home')
    },

    'application/json': function () {
      res.status(404).send('Error : The producer was not found.')
    },

    default: function () {
      if (alert) {
        req.session.alert = 'Error : The producer was not found.'
      }
      res.status(404).redirect('/home')
    }
  })
}

module.exports = Router
