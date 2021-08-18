'use strict'
const SHA256 = require('crypto-js/sha256');

module.exports = {
	codeGen: function(length = 10) {
		const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		var result = ''
		for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
		return result
	},
	genId: function() {
		var current_date = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		return SHA256(current_date + random);
	}

}
	
