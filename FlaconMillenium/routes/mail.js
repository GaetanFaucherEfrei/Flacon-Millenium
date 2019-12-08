const EXPRESS = require('express')
const NODEMAILER = require('nodemailer')
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

const TRANSPORTER = NODEMAILER.createTransport({
  service: 'gmail',
  auth: {
    user: 'FlaconMillenium@gmail.com',
    pass: 'Millenium1234('
  }
})

var MailNotification = null

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
        MailNotification = setInterval(function () {
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
      clearInterval(MailNotification)
      MailNotification = null

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
      if (MailNotification) {
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

function validateEmail (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function testMail (emailAddress, subject, content) {
  var mailOptions = {
    from: 'Flacon Millenium <FlaconMillenium@gmail.com>',
    to: emailAddress,
    subject: subject,
    html: content
  }

  TRANSPORTER.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('mail error ::> ' + error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

/* call every 'interval' in millisecond the 'functionToCall' with 'dynamicParameter' as parameter
function createInterval (functionToCall, dynamicParameter, interval) {
  setInterval(function () {
    functionToCall(dynamicParameter)
  }, interval)
}
*/

module.exports = Router
