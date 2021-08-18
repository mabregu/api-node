'use strict'

const Model = require('../core/Model');
const table = "roles";

class RolModel extends Model {

	modelRolFunction() {
		return this.db.getAll(table);
	}

	modelRolByIdFunction()  {
		return this.db.getById(2, table);
	}
}

module.exports = new RolModel