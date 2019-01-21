module.exports = {
	init: function() {
		const {Client} = require('pg')
		return new Client({
		  user: 'postgres',
		  host: 'localhost',
		  database: 'mycoach',
		  password: 'root',
		  port: 5432,
		});
	}
}