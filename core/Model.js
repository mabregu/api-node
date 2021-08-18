
const db = require('../service/database');

class Model {
    constructor() {
        this.db = new db();
    }
}

module.exports = Model