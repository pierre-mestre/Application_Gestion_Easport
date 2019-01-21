module.exports = {
	post_login: function(req, res, pg){
		const query = {
			text: 'SELECT * FROM public.users WHERE pseudo=$1 AND password=$2',
			values: [req.body.pseudo, req.body.password],
		};
		pg.query(query, (err, p_res) => {
			if(err) console.log("Error", err);
			else {
				if(p_res.rowCount ==0){
					req.body.html = null;
				} else {
					req.body.html = '<p>Bienvenue ' + req.body.pseudo + '</p>';

				}
				res.set("Content-Type", "application/json");
				res.send(req.body);
			}
		});
	}
}