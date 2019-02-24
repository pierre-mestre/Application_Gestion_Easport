var express = require('express');
var sess = require('express-session');
var bodyParser = require('body-parser');
var sha1 = require('sha1');
var overwatch = require('overwatch-api');
const {Client} = require('pg');

var pg = new Client({
	  user: 'postgres',
	  host: 'localhost',
	  database: 'postgres',
	  password: 'root',
	  port: 5432
});

pg.connect();

var app= express();
var session;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use("/css/",express.static(__dirname+"/css/"));
app.use(sess({secret: 'P@ssw0rdG@m3rs'}));

app.get('/', function(req,res){
	res.render('battle.ejs',{});
})
.post('/overwatch', function(req,res){
	if(req.body.platform!==undefined && req.body.region!==undefined && req.body.tag!==undefined){
		var battletag = req.body.tag.replace('#','-');
		overwatch.getProfile(req.body.platform, req.body.region, battletag, (err, json) => {
	  		if (err) console.error(err);
	  		else 
	  		{
	  			json.level = json.level || 0;
	  			json.games.quickplay.won = json.level || 0;
	  			json.competitive.rank = json.competitive.rank || 0;
	  			json.games.competitive.played = json.games.competitive.played || 0;
	  			json.games.competitive.won = json.games.competitive.won || 0;
	  			json.games.competitive.lost = json.games.competitive.lost || 0;
	  			json.playtime.quickplay = json.playtime.quickplay || 0;

	  			res.set('Content-Type', 'text/html');
	  			res.render('overwatch.ejs',{data : json});
	  			res.end();
	  		}
		});
	}
	else{
		res.redirect('/');
	}
})

.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
})

app.listen(8080);