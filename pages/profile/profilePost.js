module.exports = {
	get_user : function(req, res, dao){
		res.set("Content-Type", "application/json");
		res.send(req.body.session);
	}
}