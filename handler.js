'use strict'

var requestTrainTimes = require('./mvgApi.js')

module.exports.HomeToWork = () => {
    requestTrainTimes(130, 100)
}
