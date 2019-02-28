module.exports = {
	get_user : function(req, res, dao){
		req.body.mail = req.session.mail;
		req.body.pseudo = req.session.pseudo;
		req.body.u_id = req.session.u_id;
		res.set("Content-Type", "application/json");
		res.send(req.body);
	}
}