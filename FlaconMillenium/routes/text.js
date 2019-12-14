const EXPRESS = require('express')
const NODEMAILER = require('nodemailer')
var Router = EXPRESS.Router()
var TeleSignSDK = require('telesignsdk')

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

const customerId = 'FD832A30-9D17-4130-B21F-B2964AD4CA74'
const apiKey = 'B6XeO1KjqOlWVNy+jrn1QYl+NiG6XCtAOwujNISmrxnH4JfywTw/kxB4lorTmWxvfInEMr4pKleq8B8ortRnnQ=='
const rest_endpoint = 'https://rest-api.telesign.com'
const timeout = 10 * 1000 // 10 secs
const client = new TeleSignSDK(customerId,
  apiKey,
  rest_endpoint,
  timeout // optional
  // userAgent
)

// var TextNotification = null

Router.get('/test', async (req, res) => {
  try {
    if (req.user) {
      const phoneNumber = '33638233416'
      const message = 'test Flacon Millenium'
      const messageType = 'ARN'

      console.log('## MessagingClient.message ##')

      client.sms.message(messageCallback, phoneNumber, message, messageType)

      res.status(200).send('text send')
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

function messageCallback (error, responseBody) {
  if (error === null) {
    console.log(`Messaging response for messaging phone number: ${33638233416}` +
            ` => code: ${responseBody.status.code}` +
            `, description: ${responseBody.status.description}`)
  } else {
    console.error('Unable to send message. ' + error)
  }
}

/*
Router.get('/', async (req, res) => {
  try {
    if (req.user) {
      var alert = req.session.alert
      req.session.alert = ''
      res.status(200).render('mail', { name: req.user.username, alert: alert })
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

Router.get('/start', async (req, res) => {
  console.log('start mail')
  try {
    if (req.user) {
      var content = `<body>
        <h1>Hi User</h1>
        <p>Your bottle has acheived maturity</p>
      </body>`
      var emailAddress = req.query.userMail
      var subject = 'Testing Sending Email using Node.js'

      if (validateEmail(emailAddress)) {
        TextNotification = setInterval(function () {
          testMail(emailAddress, subject, content)
        }, 5000)

        res.status(200).send('notification started')
      } else {
        res.status(200).send('Invalid email address')
      }
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

Router.get('/stop', async (req, res) => {
  console.log('stop mail')
  try {
    if (req.user) {
      // stop the repeated call of the fonction attach to this global variable
      clearInterval(TextNotification)
      TextNotification = null

      res.status(200).send('notification stopped')
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

Router.get('/status', async (req, res) => {
  try {
    if (req.user) {
      if (TextNotification) {
        res.status(200).send('notification service is running')
      } else {
        res.status(200).send('notification service is not running')
      }
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
*/

/* call every 'interval' in millisecond the 'functionToCall' with 'dynamicParameter' as parameter
function createInterval (functionToCall, dynamicParameter, interval) {
  setInterval(function () {
    functionToCall(dynamicParameter)
  }, interval)
}
*/

module.exports = Router
