module.exports = {
	post_login: function(req, res, dao){
		dao.getUserBySignIn(req.body.email, req.body.password, function(result) {
			if(result.rowCount == 0) req.body.connected = false;
			else {
				req.session.pseudo = result.rows[0].pseudo;
				req.body.connected = true;
			}
			res.set("Content-Type", "application/json");
			res.send(req.body);
		});
	}
}