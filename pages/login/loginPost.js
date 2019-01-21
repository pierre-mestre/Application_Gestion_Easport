module.exports = {
	post_login: function(req, res, pg){
		const query = {
			text: 'SELECT * FROM public.user WHERE mail=$1 AND password=$2',
			values: [req.body.pseudo, req.body.password],
		};
		pg.query(query, (err, p_res) => {
			if(err) console.log("Error", err);
			else {
				if(p_res.rowCount ==0){
					req.body.connected = false;
				} else {
					req.session.pseudo = req.body.pseudo
					req.body.connected = true;
				}
				res.set("Content-Type", "application/json");
				res.send(req.body);
			}
		});
	}
}