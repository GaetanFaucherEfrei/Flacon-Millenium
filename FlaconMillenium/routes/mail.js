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

var MAIL_NOTIFICATION = null

Router.get('/start', async (req, res) => {
  var content = `<body>
    <h1>Hi Etienne</h1>
    <p>Your bottle has acheived maturity</p>
  </body>`
  var emailAddress = 'etienne.robbiani@gmail.com'
  var subject = 'Testing Sending Email using Node.js'

  MAIL_NOTIFICATION = setInterval(function () {
    testMail(emailAddress, subject, content)
  }, 5000)

  res.status(200).send('notification started')
  // res.status(401).redirect(301, '/user/login')
})

Router.get('/stop', async (req, res) => {
  // stop the repeated call of the fonction attach to this global variable
  clearInterval(MAIL_NOTIFICATION)

  res.status(200).send('notification stopped')
  // res.status(401).redirect(301, '/user/login')
})

function testMail (dynamicParameter) {
  var mailOptions = {
    from: 'Flacon Millenium <FlaconMillenium@gmail.com>',
    to: dynamicParameter.emailAddress,
    subject: dynamicParameter.subject,
    html: dynamicParameter.content
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
