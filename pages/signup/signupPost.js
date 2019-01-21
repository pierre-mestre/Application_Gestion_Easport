module.exports = {
	post_signup: function(req, res, pg){
		const query_get = {
			text: 'SELECT * FROM public.user WHERE u_mail=$1 OR u_pseudo=$2',
			values: [req.body.mail, req.body.pseudo]
		};
		pg.query(query_get, (err, p_res) => {
			if(err) console.log("Error", err);
			else {
				if(p_res.rowCount == 0){
					// INSERT INTO
				} else {
					console.log(p_res);
				}
			}
		});


		/*const query_ins = {
			text: 'INSERT INTO public.user VALUES ($1, $2)',
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
		});*/
	}
}