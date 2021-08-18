'use strict'

const Model = require('../core/Model');
//const P = require('bluebird');
const table = "rooms";

class RoomModel extends Model {

	modelRooms() {
		return this.db.getAll(`view_${table}`);
	}

	modelRoomsFilter(id)  {
		return this.db.getById(id, table);
	}

	// async modelRoomsFunction()  {
	// 	let connection = await this.db.getConnection();
	// 	return new P((resolve, reject) => {
	// 		connection.query(`select id,admin,name,duration,code,url,created_at,updated_at,status,date from ${table}`, (error, results) => {
	// 			if (error) {
	// 				return connection.rollback(() => {
	// 					connection.release();
	// 					return reject(error);
	// 				});
	// 			}
	// 			return resolve(results);
	// 		});
	// 	});
	// }
}

module.exports = new RoomModel