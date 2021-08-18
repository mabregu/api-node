'use strict'

const axios = require('axios')
const S = require('../config/strings')

class Connector {

    constructor() {
        let service = axios.create({ headers: { 'Content-Type': 'application/json' } })
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }

    req(method, path, payload) {
        switch (method) {
            case 'GET':
                return this.get(path, payload)
            case 'POST':
                return this.post(path, payload)
            case 'PUT':
                return this.put(path, payload)
        }
    }

    handleSuccess(response) {
        return response
    }

    handleError(error) {

        var er;
        switch (error.response.status) {
            case 406:
                er = (error.response.data.msg) ? error.response.data.msg : S.NO_USER
                break
            case 404:
                er = (error.response.data.msg) ? error.response.data.msg : S.NO_RESULTS
                break
            case 403:
                er = (error.response.data.msg) ? error.response.data.msg : S.NO_ACTIVE
                break;
            default:
                er = (error.response.data && error.response.data.msg) ? error.response.data.msg : S.ERROR
                break
        }

        return Promise.reject(er)
    }


    get(path, payload) {
        return this.service.request({
            method: 'GET',
            url: path,
            responseType: 'json',
            data: payload
        }).then(response => response)
        .catch(err => err);
    }

    put(path, payload) {
        return this.service.request({
            method: 'PUT',
            url: path,
            responseType: 'json',
            data: payload
        }).then(response => response)
            .catch(err => err);
    }

    post(path, payload) {
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        }).then(response => response)
            .catch(err => err);
    }
}

module.exports = new Connector