var WebSocket = require('ws')
var { getDistance } = require('geolib')

var myPosition = {
    latitude: 42.46, // the latitude of my position
    longitude: 20.63 // the longitude of my position
}
var radius = 15000 // the maximum distance around my position a strike will be detected, (in meters)
var soundSpeed = 337 // the speed of the sound, (in meters per seconde)

try {
    var rnd = parseInt(Math.random()*40)+50
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
    var distance = getDistance(myPosition, impactPosition)

    if (Math.floor(distance) > radius) { return }

    var impactIn = distance / soundSpeed // - impact.delay
    beep(impactIn)
}

function beep(impactIn) {
    var remainingSeconds = impactIn

    while(remainingSeconds > 1) {
        remainingSeconds = remainingSeconds / 2
        setTimeout(function () {
            process.stderr.write("\007")
            console.log('debug: beep')
        }, (impactIn - remainingSeconds) * 1000)
    }
}
