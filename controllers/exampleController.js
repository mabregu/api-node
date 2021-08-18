'use strict'

const _ = require('lodash');
const Response = require('../service/response');
const P = require('bluebird');
const m = require('../models/exampleModel');
// const Con = require('../service/connector');
/**
 * 
 * @param {int} id_account 
 * @param {string} cloud_id 
 */
function controllerExampleFunction(req, res) {
	return P.bind(this)
		.then(() => {
			 return m.example2();
		})
		.then(result => {
			return m.modelExampleFunction()
				.then(results => [result, results])
				.catch(err => err);
		})
		.spread((a, b) => {
			return [a, b, m.example3(req.params.id)];
			
		})
		.spread((a, b, c) =>  new Response(res, [a,b,c], "").success())
		.catch(error =>  new Response(res, null, error).error()
	);
}

module.exports = {
	controllerExampleFunction
}