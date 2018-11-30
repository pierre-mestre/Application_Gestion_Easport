import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import db from "./db";

const app = express();

const pg = db.init('postgres', 'localhost', 'mycoach', 'root', 5432);

app.use("/static/", express.static(__dirname + "/../static/"));

// Json parsing
app.use(bodyParser.json());

app.get("/", function(req, res) {
	const content = fs.readFileSync(`${__dirname}/../view/index.html`);
	const token = req.headers.authorization;
	const origin = req.headers.origin;
	res.set("Content-Type", "text/html");
	res.send(content.toString());
});

app.post("/post-login", async (req, res) => {
	console.log('azeaze');
	const query = {
		text: 'SELECT * FROM public.user WHERE username=\'Eliot\' AND password=\'pouet\'',
		values: [req.username, req.password],
	};
	const result = await pg.query(query);
	console.log(result);
	console.log('huehue');
	res.set("Content-Type", "application/json");
	res.send(req.body);
});

module.exports = app;
