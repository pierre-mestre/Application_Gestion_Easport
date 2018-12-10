import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import db from "./db";

const app = express();

const pg = db.init('postgres', 'localhost', 'mycoach', 'root', 5432);

app.use("/static/", express.static(__dirname + "/../static/"));
app.use("/scripts/", express.static(__dirname + "/../scripts/"));

// Json parsing
app.use(bodyParser.json());

app.get("/", function(req, res) {
	const content = fs.readFileSync(`${__dirname}/../view/index.html`);
	const token = req.headers.authorization;
	const origin = req.headers.origin;
	res.set("Content-Type", "text/html");
	res.send(content.toString());
});

app.post("/post-login", (req, res) => {
	const query = {
		text: 'SELECT * FROM public.users WHERE pseudo=$1 AND password=$2',
		values: [req.body.pseudo, req.body.password],
	};
	pg.connect();
	pg.query(query, (err, p_res) => {
		if(err) console.log("Error", err);
		else {
			if(p_res.rowCount == 0){
				req.body.html = `<form>
                <div class="form-group">
                <label for="username">Nom d'utilisateur</label>
                <input type="text" class="form-control" id="username" placeholder="Pseudo" value="${req.body.pseudo}">
                </div>
                <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" class="form-control" id="password">
                </div>
                <button id="login-submit" type="button" class="btn btn-primary">Connexion</button>
            	</form>`;
			} else {
				req.body.html ='<p>Bienvenue</p>';
			}
			res.set("Content-Type", "application/json");
			res.send(req.body)
		}
	});
	
});

module.exports = app;
