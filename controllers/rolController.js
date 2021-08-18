'use strict'

const Response = require('../service/response');
const P = require('bluebird');
const m = require('../models/rolModel');

function controllerRolFunction(req, res) {
	return P.bind(this)
		.then(() => {
			return m.modelRolFunction()
				.then(results => new Response(res, results, "").success())
				.catch(err => err);
		})
		.catch(error =>  new Response(res, null, error).error()
	);
}

module.exports = {
	controllerRolFunction
}