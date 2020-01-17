const EXPRESS = require('express')
const BOTTLE = require('../../models/bottle.model.js')
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
      BOTTLE.find({}, function (error, result) {
        if (error) {
          // console.log('The unit did not exist.')
          notFound(req, res, 0)
        } else {
          // console.log('Result: ', result)
          var alert = req.session.alert
          req.session.alert = ''

          res.format({
            'text/html': function () {
              res.status(200).render('bottle/bottleList', { data: result, name: req.user.username, alert: alert })
            },

            'application/json': function () {
              res.status(200).send(result)
            },

            default: function () {
              res.status(200).render('bottle/bottleView', { data: result, name: req.user.username })
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
        BOTTLE.findById({ _id: req.query.id }, function (error, result) {
          if (error) {
            // console.log('The unit did not exist.')
            notFound(req, res, 1)
          } else {
            if (result) {
              res.format({
                'text/html': function () {
                  res.status(200).render('bottle/bottleView', { data: result, name: req.user.username })
                },

                'application/json': function () {
                  res.status(200).send(result)
                },

                default: function () {
                  res.status(200).render('bottle/bottleView', { data: result, name: req.user.username })
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
      req.body.gift = verifBoolean(req.body.gift)
      req.body.given = verifBoolean(req.body.given)
      req.body.corkscrew = verifBoolean(req.body.corkscrew)
      new BOTTLE({
        gift: req.body.gift,
        given: req.body.given,
        price: req.body.price,
        corkscrew: req.body.corkscrew,
        dateInput: req.body.dateInput,
        reasonInput: req.body.reasonInput,
        dateOutput: req.body.dateOutput,
        reasonOutput: req.body.reasonOutput,
        observation: req.body.observation,
        recomandation: req.body.recomandation,
        IDwine: req.body.IDwine,
        IDstatus: req.body.IDstatus,
        IDsize: req.body.IDsize,
        IDlocation: req.body.IDlocation,
        IDowner: req.body.IDowner,
        IDgiver: req.body.IDgiver,
        IDrecipient: req.body.IDrecipient,
        IDsugarDosage: req.body.IDsugarDosage,
        IDservedWith: req.body.IDservedWith
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
      req.session.oldUrl = '/bottle/list'
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
      req.body.gift = verifBoolean(req.body.gift)
      req.body.given = verifBoolean(req.body.given)
      req.body.corkscrew = verifBoolean(req.body.corkscrew)
      BOTTLE.findByIdAndUpdate({ _id: req.body.id }, {
        $set: {
          gift: req.body.gift,
          given: req.body.given,
          price: req.body.price,
          corkscrew: req.body.corkscrew,
          dateInput: req.body.dateInput,
          reasonInput: req.body.reasonInput,
          dateOutput: req.body.dateOutput,
          reasonOutput: req.body.reasonOutput,
          observation: req.body.observation,
          recomandation: req.body.recomandation,
          IDwine: req.body.IDwine,
          IDstatus: req.body.IDstatus,
          IDsize: req.body.IDsize,
          IDlocation: req.body.IDlocation,
          IDowner: req.body.IDowner,
          IDgiver: req.body.IDgiver,
          IDrecipient: req.body.IDrecipient,
          IDsugarDosage: req.body.IDsugarDosage,
          IDservedWith: req.body.IDservedWith
        }
      }, function (error, result) {
        if (error) {
          // console.log('The unit did not exist.')
          notFound(req, res, 1)
        } else {
          if (result) {
            result.gift = req.body.gift
            result.given = req.body.given
            result.price = req.body.price
            result.corkscrew = req.body.corkscrew
            result.dateInput = req.body.dateInput,
            result.reasonInput = req.body.reasonInput
            result.dateOutput = req.body.dateOutput
            result.reasonOutput = req.body.reasonOutput
            result.observation = req.body.observation
            result.recomandation = req.body.recomandation
            result.IDwine = req.body.IDwine
            result.IDstatus = req.body.IDstatus
            result.IDsize = req.body.IDsize
            result.IDlocation = req.body.IDlocation
            result.IDowner = req.body.IDowner
            result.IDgiver = req.body.IDgiver
            result.IDrecipient = req.body.IDrecipient
            result.IDsugarDosage = req.body.IDsugarDosage
            result.IDservedWith = req.body.IDservedWith

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
      BOTTLE.findByIdAndDelete({ _id: req.body.id }, function (error, result) {
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
        req.session.alert = 'Error : The bottle was not found.'
      }
      res.status(404).redirect('/home')
    },

    'application/json': function () {
      res.status(404).send('Error : The bottle was not found.')
    },

    default: function () {
      if (alert) {
        req.session.alert = 'Error : The bottle was not found.'
      }
      res.status(404).redirect('/home')
    }
  })
}

module.exports = Router
