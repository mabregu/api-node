'use strict'

const STRING = require('../config/strings')
const _ = require('lodash')

class Response {

    constructor(res, data = false, msg = false) {
        this.res = res
        this.msg = msg
        this.data = data
        this.status = false
    }

    get handler() {
        return (err, results) => {

            if (_.isNumber(err))
                return this.parseData(err, results)

            this.data = results
            this.msg = (!err || !err.message) ? err : err.message

            if (err)
                return this.error()

            if (!results) {
                this.error = STRING.NO_RESULTS
                return this.notfound()
            }

            return this.success()
        }
    }

    parseData(status, data) {
        this.data = data.data
        this.status = data.status
        this.msg = data.msg

        switch (status) {
            case 404:
                return this.notfound()
            case 500:
                return this.error()
            case 403:
                return this.forbiden()
            case 409:
                return this.conflict()
            default:
                this.success()
        }
    }

    notfound() {
        return this.res.status(404).send(this.json())
    }

    error() {
        return this.res.status(500).send(this.json())
    }

    forbiden() {
        return this.res.status(403).send(this.json())
    }

    conflict() {
        return this.res.status(409).send(this.json())
    }

    success() {
        this.status = true
        return this.res.status(200).send(this.json())
    }

    json() {
        return { status: this.status, data: this.data, msg: this.msg }
    }

}

module.exports = Response