const EXPRESS = require('express')
const WINE = require('../../models/wine.model.js')
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
      WINE.find({}, function (error, result) {
        if (error) {
          // console.log('The unit did not exist.')
          notFound(req, res, 0)
        } else {
          // console.log('Result: ', result)
          var alert = req.session.alert
          req.session.alert = ''

          res.format({
            'text/html': function () {
              res.status(200).render('wine/wineList', { data: result, name: req.user.username, alert: alert })
            },

            'application/json': function () {
              res.status(200).send(result)
            },

            default: function () {
              res.status(200).render('wine/wineList', { data: result, name: req.user.username })
            }
          })
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
        notFound(req, res, 0)
      } else {
        WINE.findById({ _id: req.query.id }, function (error, result) {
          if (error) {
            // console.log('The unit did not exist.')
            notFound(req, res, 1)
          } else {
            if (result) {
              res.format({
                'text/html': function () {
                  res.status(200).render('wine/wineView', { data: result, name: req.user.username })
                },

                'application/json': function () {
                  res.status(200).send(result)
                },

                default: function () {
                  res.status(200).render('wine/wineView', { data: result, name: req.user.username })
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

function verifBoolean(bool){
  if(bool){
    if(bool === ''){
      bool = false
    }else{
      bool = true
    }
  }else{
    bool = false
  }
  return bool
}

// to use with an ajax call
Router.post('/unit', async (req, res) => {
  try {
    if (req.user) {
      req.body.vintage = verifBoolean(req.body.vintage)
      req.body.bio = verifBoolean(req.body.bio)
      req.body.oakBarrel = verifBoolean(req.body.oakBarrel)
      new WINE({
        name: req.body.name,
        vintage: req.body.vintage,
        alcoholPercentage: req.body.alcoholPercentage,
        bio: req.body.bio,
        oakBarrel: req.body.oakBarrel,
        conservationTime: req.body.conservationTime,
        temperatureConservation: req.body.temperatureConservation,
        consomationTime: req.body.consomationTime,
        temperatureConsomation: req.body.temperatureConsomation,
        comment: req.body.comment,
        IDproducer: req.body.IDproducer,
        IDcategory: req.body.IDcategory,
        IDdesignation: req.body.IDdesignation
      }).save(function (error, result) {
        if (error) {
          console.log('Check the type of your entry :' + error)
          res.status(400).send('Check the type of your entry')
        } else {
          // console.log('The post was succesfull.')
          res.status(200).send(result)
        }
      })
    } else {
    // console.log('User not identified.')
      req.session.oldUrl = '/wine/list'
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
      req.body.vintage = verifBoolean(req.body.vintage)
      req.body.bio = verifBoolean(req.body.bio)
      req.body.oakBarrel = verifBoolean(req.body.oakBarrel)
      WINE.findByIdAndUpdate({ _id: req.body.id }, {
        $set: {
          name: req.body.name,
          vintage: req.body.vintage,
          alcoholPercentage: req.body.alcoholPercentage,
          bio: req.body.bio,
          oakBarrel: req.body.oakBarrel,
          conservationTime: req.body.conservationTime,
          temperatureConservation: req.body.temperatureConservation,
          consomationTime: req.body.consomationTime,
          temperatureConsomation: req.body.temperatureConsomation,
          comment: req.body.comment,
          IDproducer: req.body.IDproducer,
          IDcategory: req.body.IDcategory,
          IDdesignation: req.body.IDdesignation
        }
      }, function (error, result) {
        if (error) {
          // console.log('The unit did not exist.')
          notFound(req, res, 1)
        } else {
          if (result) {
            result.name = req.body.name
            result.vintage = req.body.vintage
            result.alcoholPercentage = req.body.alcoholPercentage
            result.bio = req.body.bio
            result.oakBarrel = req.body.oakBarrel
            result.conservationTime = req.body.conservationTime
            result.temperatureConservation = req.body.temperatureConservation
            result.consomationTime = req.body.consomationTime
            result.temperatureConsomation = req.body.temperatureConsomation
            result.comment = req.body.comment
            result.IDproducer = req.body.IDproducer
            result.IDcategory = req.body.IDcategory
            result.IDdesignation = req.body.IDdesignation

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
      WINE.findByIdAndDelete({ _id: req.body.id }, function (error, result) {
        if (error) {
          // console.log('The unit did not exist.')
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
        req.session.alert = 'Error : The wine was not found.'
      }
      res.status(404).redirect('/home')
    },

    'application/json': function () {
      res.status(404).send('Error : The wine was not found.')
    },

    default: function () {
      if (alert) {
        req.session.alert = 'Error : The wine was not found.'
      }
      res.status(404).redirect('/home')
    }
  })
}

module.exports = Router
