'use strict'

const _ = require('lodash');
const Model = require('../core/Model');
const P = require('bluebird');
const table = "users";

class UserModel extends Model {

	modelGetUsers() {
		return this.db.getAll(table);
	}

	modelGetUsersDeleted() {
		return this.db.getDeleted(table);
	}

	modelUserFilter(username)  {
		return this.db.getByName(username, table);
	}

	modelUserPut(data) {
		return this.db.putOne(table, data);
	}

	modelUserSet(data, filtro) {
		let where = `name = '${filtro}'`;

		return this.db.setOne(table, data, where);
	}

	modelUserDel(id) {
		return this.db.deleteOne(table, id);
	}
}

module.exports = new UserModel