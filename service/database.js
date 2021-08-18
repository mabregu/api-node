'use strict'

const mysql = require('mysql');
const config = require('../config/database').mysql;
const P = require('bluebird');

class Database {

    constructor() {
        this.config = config;
        this.connection = mysql.createConnection(config);
        if (config.pool) {
            if (!config.connectionLimit) {
                this.config.connectionLimit = 100;
                this.config.multipleStatements = true;
            }
            this.pool = mysql.createPool(this.config);
        }
    }

    getConnection() {
        if (config.pool) {
            return new P((resolve, reject) => {
                this.pool.getConnection((error, connection) => {
                    if (error) return reject(error);
                    return resolve(connection);
                });
            });
        }
        return this.connection;
    }

    connect() {
        return new P((resolve, reject) => {
            if (!this.connection) {
                this.connection = getConnection();
            }
            return resolve(this.connection);
        });
    }

    isAlive() {
        return this.execute(`SELECT TABLE_NAME AS name FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${config.database}'`).then(tables => {
            return !!_.find(tables, 'name');
        });
    }

    end() {
        return new P((resolve, reject) => {
            this.connection.end(error => {
                if (error) return reject(error);
                if (this.config.pool) {
                    this.pool.end(error => {
                        if (error) return reject(error);

                        this.pool = null;
                        return resolve();
                    });
                }
                this.connection = null;
                return resolve();
            });
        });
    }

    execute(query, arr) {
        return new P((resolve, reject) => {
            this.connection.query(query, arr, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            })
        })
    }

    async transaction(callback) {

        // SET SESSION sql_mode = 'STRICT_TRANS_TABLES'

        let newconnection;
        if (this.config.pool) {
            newconnection = await this.getConnection();
        } else {
            newconnection = this.connection;
        }
        return new P((resolve, reject) => {
            return newconnection.beginTransaction(error => {
                if (error) return reject(error);
                return P.resolve()
                    .then(() => callback(newconnection))
                    .then(result => {
                        return new P((resolve, reject) => {
                            newconnection.commit(error => {
                                if (error) return reject(error);
                                return resolve(result);
                            });
                        });
                    })
                    .then(resolve)
                    .catch(error => newconnection.rollback(() => reject(error)));
            });
        });
    }

    get(table, fields) {
        return this.execute(`SELECT ?? FROM ${table}`, [fields]).then(results => results).catch(error => {
            throw error
        });
    }

    getWhere(table, fields, where) {
        return this.execute(`SELECT ?? FROM ${table} WHERE ${where}`, [fields]).then(results => results).catch(error => {
            throw error
        });
    }

    getAllWhere(table, where) {
        return this.execute(`SELECT * FROM ${table} WHERE ${where}`, null).then(results => results).catch(error => {
            throw error
        });
    }

    getAll(table) {
        return this.execute(`SELECT * FROM ${table} where status = 1`, null).then(results => results).catch(error => {
            throw error
        });
    }

    getDeleted(table) {
        return this.execute(`SELECT * FROM ${table} where status = 0`, null).then(results => results).catch(error => {
            throw error
        });
    }

    getOne(table) {
        return this.execute(`SELECT * FROM ${table} LIMIT 1`, null).then(results => results).catch(error => {
            throw error
        });
    }

    getSome(table, limit) {
        return this.execute(`SELECT * FROM ${table} LIMIT ${limit}`, null).then(results => results).catch(error => {
            throw error
        });
    }

    getSomeWhere(table, where, limit) {
        return this.execute(`SELECT * FROM ${table} WHERE ${where} ORDER BY id DESC LIMIT ${limit}`, null).then(results => results).catch(error => {
            throw error
        });
    }

    getById(id, table) {
        return this.execute(`SELECT * FROM ${table} WHERE id = ?`, [id]).then(results => results).catch(error => {
            throw error
        });
    }

    getByName(name, table) {
        return this.execute(`SELECT * FROM ${table} WHERE name = ?`, [name]).then(results => results).catch(error => {
            throw error
        });
    }

    putOne(table, data) {
        return this.execute(`INSERT INTO ${table} SET ?`, data).then(results => results).catch(error => {
            throw error
        });
    }

    setOne(table, data, where) {
        return this.execute(`UPDATE ${table} SET ? WHERE ${where}`, data).then(results => results).catch(error => {
            throw error
        });
    }

    deleteOne(table, id) {
        return this.execute(`UPDATE ${table} SET status = 0 WHERE name = '${id}'`, null).then(results => results).catch(error => {
            throw error
        });
    }

}

module.exports = Database