module.exports = {
	login: function(req, res, getIndex, element){
		const content = getIndex(element);
		const token = req.headers.authorization;
		const origin = req.headers.origin;
		res.set("Content-Type", "text/html");
		res.send(content.toString());
	}
}