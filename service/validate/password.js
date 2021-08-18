'use strict'

const _ = require('lodash')

function checkPaswords(pass, lastsPass) {
    var ret = false
    _.each(lastsPass, (value, key) => {
        if(value == pass)
            ret = true
    })
    return ret
}

module.exports = checkPaswords