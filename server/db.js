module.exports = {
	init: function(u, h, db, pw, prt) {
		const {Client} = require('pg')
		return new Client({
		  user: u,
		  host: h,
		  database: db,
		  password: pw,
		  port: prt,
		});
	}
}