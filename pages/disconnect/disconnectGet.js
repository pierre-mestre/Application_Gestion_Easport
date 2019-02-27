module.exports = {
	disconnect : function(req, res, getIndex, element){
		req.session.pseudo = undefined;
		res.redirect('/index');
	}
}