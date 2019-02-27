module.exports = {
	api_get_player: function(req, res, dao){
		var overwatch = require('overwatch-api');
		const battletag = req.body.battletag.replace('#', '-').replace(' ', '');
		if(battletag == ''){
			res.set("Content-Type", "application/json");
			res.send(req.body);
			return;
		}
		overwatch.getProfile('pc', 'eu', battletag, (err, json) => {
	  		if (!err)
	  		{
	  			req.body.stats = json;
	  			/*req.body.stats.level = json.level || '-';
	  			req.body.stats.games.quickplay.won = json.level || '-';
	  			req.body.stats.competitive.rank = json.competitive.rank || '-';
	  			req.body.stats.games.competitive.played = json.games.competitive.played || '-';
	  			req.body.stats.games.competitive.won = json.games.competitive.won || '-';
	  			req.body.stats.games.competitive.lost = json.games.competitive.lost || '-';
	  			req.body.stats.playtime.quickplay = json.playtime.quickplay || '-';*/
	  		}
	  		res.set("Content-Type", "application/json");
			res.send(req.body);
		});
	}
}