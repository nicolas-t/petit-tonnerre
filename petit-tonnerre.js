var WebSocket = require('ws')
var { getDistance } = require('geolib')
var argv = require('yargs')
    .alias('lat', 'latitude')
    .describe('lat', 'the latitude of your position')
    .default('lat', 21.3069440, '21.3069440')

    .alias('lon', 'longitude')
    .describe('lon', 'the longitude of your position')
    .default('lon', -157.8583330, '-157.8583330')

    .alias('r', 'radius')
    .describe('r', 'the maximum distance around your position a strike will be detected, (in meters)')
    .default('r', 5000, '5000m')

    .alias('s', 'speed')
    .describe('s', 'the speed of the sound, (in meters per second)')
    .default('s', 337, '337m/s')

    .help('help')
  .argv

var latitude = argv.latitude
var longitude = argv.longitude
var radius = argv.radius
var soundSpeed = argv.speed

try {
    var rnd = parseInt(Math.random() * 40) + 50
    ws = new WebSocket('ws://ws.blitzortung.org:80' + rnd)
} catch (e) {
    console.error(e)
}

ws.onopen = function() {
    ws.send('{"west":-180.0,"east":180.0,"north":90.0,"south":-90.0}');
}

ws.onmessage = function({ data }) {
    var impact = JSON.parse(data)
    var impactPosition = {
        latitude: impact.lat,
        longitude: impact.lon
    }

    var myPosition = {
        latitude: latitude,
        longitude: longitude
    }

    var distance = getDistance(myPosition, impactPosition)

    if (Math.floor(distance) > radius) { return }

    var impactIn = distance / soundSpeed - impact.delay
    beep(impactIn)
}

function beep(impactIn) {
    var remainingSeconds = impactIn

    while(remainingSeconds > 1) {
        remainingSeconds = remainingSeconds / 2
        setTimeout(function () {
            process.stderr.write("\007")
        }, (impactIn - remainingSeconds) * 1000)
    }
}
