'use strict'

const _ = require('lodash')

function validate(params, fields) {
    // let body = req.body
    let resp = true
    fields.forEach(field => {
        if (!_.has(params, field) )
            resp = false
    })
    return resp
}

module.exports = validate