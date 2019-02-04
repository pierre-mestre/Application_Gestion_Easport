module.exports = {
	post_signup: function(req, res, dao){
		let u = req.body;
		dao.setUserBySignUp(
			u.fname,
			u.lname,
			u.mail,
			u.password,
			u.pseudo,
			'28-05-1998',
			function(result) {
				req.body.success = true;
				res.set("Content-Type", "application/json");
				res.send(req.body);
			},
			function(mail) {
				req.body.success = false;
				req.body.err = 'mail';
				res.set("Content-Type", "application/json");
				res.send(req.body);
			}
		)
	}
}