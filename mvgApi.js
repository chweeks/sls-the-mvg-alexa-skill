var request = require('request')

module.exports = requestTrainTimes = (origin, destination) =>
    request(
        {
            url: `https://www.mvg.de/api/fahrinfo/routing/?fromStation=${origin}&toStation=${destination}`,
            headers: {
                'X-MVG-Authorization-Key': '5af1beca494712ed38d313714d4caff6',
                Accept: 'application/json',
            },
        },
        (error, response, body) => {
            const currentTime = new Date()
            const departureTimes = JSON.parse(body).connectionList.map(route => new Date(route.departure))
            const minutesToDeparture = departureTimes.map(time => Math.floor((time - currentTime) / 1000 / 60))
            const validDepartureTimes = minutesToDeparture.filter(time => time > 0).slice(0, 3)
            const finalDepartureTime = validDepartureTimes.pop()
            return {
                response: {
                    outputSpeech: {
                        type: 'PlainText',
                        text: `The next trains to Hauptbanhof will be leaving in ${validDepartureTimes} and ${finalDepartureTime} minutes`,
                    },
                },
            }
        },
    )
