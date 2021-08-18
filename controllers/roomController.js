'use strict'

const Response = require('../service/response');
const P = require('bluebird');
const m = require('../models/roomModel');

function getAllRooms(req, res) {
	return P.bind(this)
		.then(() => {
			return m.modelRooms()
				.then(results => new Response(res, results, "").success())
				.catch(err => err);
		})
		.catch(error =>  new Response(res, null, error).error()
	);	
}

function getRoomsByParams(req, res) {
	return P.bind(this)
		.then(() => {
			return m.modelRoomsFilter(req.params.id)
				.then(results => new Response(res, results, "").success())
				.catch(err => err);
		})
		.catch(error =>  new Response(res, null, error).error()
	);
}

module.exports = {
	getAllRooms,
	getRoomsByParams
}