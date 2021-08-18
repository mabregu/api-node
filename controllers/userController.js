'use strict'

const _ = require('lodash');
const Response = require('../service/response');
const P = require('bluebird');
const m = require('../models/userModel');

async function getAll(req, res) {
	try {
		await P.bind(this);
		try {
			const results = await m.modelGetUsers();
			return new Response(res, results, "").success();
		} catch (err) {
			return err;
		}
	} catch (error) {
		return new Response(res, null, error).error();
	}
}

async function getAllDeleted(req, res) {
	try {
		await P.bind(this);
		try {
			const results = await m.modelGetUsersDeleted();
			return new Response(res, results, "").success();
		} catch (err) {
			return err;
		}
	} catch (error) {
		return new Response(res, null, error).error();
	}
}

async function getByUsername(req, res) {
	try {
		await P.bind(this);
		try {
			const results = await m.modelUserFilter(req.params.username);
			return new Response(res, results, "").success();
		} catch (err) {
			return err;
		}
	} catch (error) {
		return new Response(res, null, error).error();
	}
}

async function insertUsername(req, res) {
	const { body: user } = req;

	try {
		await P.bind(this);
		try {
			const results = await m.modelUserPut(user);
			return new Response(res, results, "").success();
		} catch (err) {
			return err;
		}
	} catch (error) {
		return new Response(res, null, error).error();
	}
}

async function updateUsername(req, res) {
	const { body: user } = req;
	const username = req.params.username;

	try {
		await P.bind(this);
		try {
			const results = await m.modelUserSet(user, username);
			return new Response(res, results, "").success();
		} catch (err) {
			return err;
		}
	} catch (error) {
		return new Response(res, null, error).error();
	}
}

async function deleteUsername(req, res) {
	const username = req.params.username;

	try {
		await P.bind(this);
		try {
			const results = await m.modelUserDel(username);
			return new Response(res, results, "").success();
		} catch (err) {
			return err;
		}
	} catch (error) {
		return new Response(res, null, error).error();
	}
}

module.exports = {
	getAll,
	getAllDeleted,
	getByUsername,
	insertUsername,
	updateUsername,
	deleteUsername,
}