const {Pool, Client} = require('pg');
const pool = new Pool({
	connectionString: 'postgres://kwuirqzxdicrii:f357dbfae392af8552bba96261e2f3f2f93de40934de7ad59a4497ba0b71f1f9@ec2-46-137-121-216.eu-west-1.compute.amazonaws.com:5432/dfb0n7aqubcfok'
});

const schema = 'public';
//dd
module.exports = {
	get: async function(select, table, where, pvalues, callback) {
		const pquery = {
			text: `SELECT ${select} FROM ${schema}.${table} WHERE ${where}`,
			values: pvalues
		};

		const client = await pool.connect();
		await client.query('BEGIN');
		client.query(pquery, (err, p_res) => {
			if(err) console.log("Error pg-js", err);
			else {
				client.release();
				callback(p_res);
			}
		});
	},

	set: async function(table, where, pvalues, callback) {
		let query_text = `INSERT INTO ${schema}.${table} (`;
		query_text += `${where[0]}`;
		for(let i=1; i<where.length; i++) query_text += `, ${where[i]}`;
		query_text += ') VALUES (';
		query_text += '$1';
		for(let i=2; i<=pvalues.length; i++) query_text += (', $'+i);
		query_text += ')';
		const pquery = {
			text: query_text,
			values: pvalues
		};
		console.log(pquery);
		console.log();
		const client = await pool.connect();
		await client.query('BEGIN');
		client.query(pquery, (err, p_res) => {
			if(err) console.log("Error pg-js", err);
			else {
				client.query('COMMIT');
				client.release();
				callback(p_res);
			}
		});
	}
}