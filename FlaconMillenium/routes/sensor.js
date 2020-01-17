const express = require('express')
var sensor = require("node-dht-sensor")
var router = express.Router()

global.results = null

router.get('/', async (req, res) => {
    res.send('Capteur de température et d\'humidité DHT11 installé')
})

router.get('/view', async (req, res) => {
    try 
    {
        const resultat = await sensor.read(11, 4);
        /*
        console.log(
          `Température: ${resultat.temperature.toFixed(1)}°C, ` +
            `Humidité: ${resultat.humidity.toFixed(1)}%`
        )
        */

       res.format({
        'text/html': function () {
          res.status(200).render('sensor', { temperature: resultat.temperature.toFixed(1), humidity: resultat.humidity.toFixed(1), name: req.user.username })
        },

        'application/json': function () {
            res.status(200).send({ temperature: resultat.temperature.toFixed(1), humidity: resultat.humidity.toFixed(1), name: req.user.username})
        },

        default: function () {
          res.status(200).render('sensor', { temperature: resultat.temperature.toFixed(1), humidity: resultat.humidity.toFixed(1), name: req.user.username })
        }
      })

    } catch (err) {
        console.error('Echec de la lecture du capteur:', err)
        res.send('Echec de la lecture du capteur')
    }

})

module.exports = router