'use strict'

const _ = require('lodash');
const Model = require('../core/Model');
const P = require('bluebird');

/**
 * 
 */

class ExampleModel extends Model {

	modelExampleFunction() {
		return this.db.getAll("datos");
	}

	example2()  {
		return this.db.getById(2, "datos");
	}

	async example3(id) {
		let connection = await this.db.getConnection();

		return new P((resolve, reject) => {

			connection.beginTransaction(function (err) {
					if (err) {
						connection.release();
						return reject(err);
					}

					connection.query(`SELECT nombre, apellido FROM datos where id = ${id} `, function (error, results) {

						if (error) {
							return connection.rollback(function () {
								connection.release();
								return reject(error);
							});
						}

						connection.query(`INSERT INTO prueba (dato, id_dato) VALUES ('${results[0].nombre} ${results[0].apellido}', ${id})`, function (error, results) {
							if (error) {
								return connection.rollback(function () {
									connection.release();
									return reject(error);
								})
							}

							connection.commit(function (error) {
								if (error) {
									return connection.rollback(function () {
										return reject(error);
									});
								}

								connection.release();

								return resolve(true);
							});
						});
					});
				});
			})
	}

	example4(datos) {
		return this.db.putOne("datos", datos);
	}

	example4(id) {
		return this.db.deleteOne("datos", id);
	}

}

module.exports = new ExampleModel