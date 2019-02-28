module.exports = {
	logout : function(req, res, getIndex, element){
		req.session.pseudo = undefined;
		res.redirect('/index');
	}
}