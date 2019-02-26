import fs from "fs";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import uuid from "uuid/v4";
import dao from "./db_routes";

const app = express();
const ROOT = process.env.INIT_CWD;

app.use("/static/", express.static(__dirname + "/../static/"));
app.use("/pages/", express.static(__dirname + "/../pages/"));
app.use("/template", express.static(__dirname + "/../template"));

app.use(session({
  genid: (req) => 
{    return uuid() // generate unique session id with UUID
  },
  secret: 'coachow21328',
  resave: false,
  saveUninitialized: true
}));

// Json parsing
app.use(bodyParser.json());

var getIndex = function(content, connected){
	var index = `<!DOCTYPE html>
				 <html lang="fr">`;
	index += fs.readFileSync(`${ROOT}/template/head.html`);
	index += `<body>`;

	if(connected === undefined || connected == false)
		index += fs.readFileSync(`${ROOT}/template/header.html`);
	else {
		index += fs.readFileSync(`${ROOT}/template/header_co.html`);
		index += connected;
		index += '</label>';
	}
	index += "</div></div></header>";

	index += `<main id="content" role="main" class="container">`;

	if(content !== undefined && typeof content == 'string'){
		const PAGES = `${ROOT}/pages/${content}`;
		if(fs.existsSync(`${PAGES}/${content}.html`)){
			index += fs.readFileSync(`${PAGES}/${content}.html`).toString();
			if(fs.existsSync(`${PAGES}/js/${content}.js`)){
				index += '<script>';
				index += fs.readFileSync(`${PAGES}/js/${content}.js`).toString();
				index += '</script>';
			}
			if(fs.existsSync(`${PAGES}/css/${content}.css`)){
				index += '<style rel="stylesheet">';
				index += fs.readFileSync(`${PAGES}/css/${content}.css`).toString();
				index += '</style>';
			}
		}
		else index += content;
	}

	index += `</main>`;
	index += fs.readFileSync(`${ROOT}/template/footer.html`);
	index += `</body>
			  </html>`;

	return index;
}

var setPages = function(itemsPath){
	var items = fs.readdirSync(`${ROOT}/${itemsPath}/`);

	var listPages = {};
    items.forEach(function(element, index){
    	var path = `${ROOT}/${itemsPath}/${element}`;
    	if(fs.lstatSync(path).isDirectory()){
    		if(element != 'js' && element != 'css') {
    			setPages(`${itemsPath}/${element}`);
    		} else return;

    		let url = itemsPath.substring(5) + '/' + element;
    		// Create the POST methods, fecthing them from the Post.js found in the page directory.
    		if(fs.existsSync(`${path}/${element}Post.js`)){
    			listPages[element] = require(`${path}/${element}Post`);
    			Object.values(listPages[element]).forEach(function(postFunc){
    				if(typeof postFunc !== 'function') return;
    				if(postFunc.name !== element) url += `/${postFunc.name}`;
    				app.post(url, function(req, res){ postFunc(req, res, dao, element) });
    			});
    		}

    		url = itemsPath.substring(5) + '/' + element;
    		// Create the GET methods, fetching them from the Get.js found in the page directory.
    		if(fs.existsSync(`${path}/${element}Get.js`)){
    			listPages[element] = require(`${path}/${element}Get`);
    			Object.values(listPages[element]).forEach(function(getFunc){
    				if(typeof getFunc !== 'function') return;
    				if(getFunc.name !== element) url += `/${getFunc.name}`;
    				app.get(url, function(req, res){ getFunc(req, res, getIndex, element) });
    			});
    			if(listPages[element][element] === 'undefined'){
    				app.get(url, function(req, res) {
    					const content = getIndex(element, req.session.pseudo);
						const token = req.headers.authorization;
						const origin = req.headers.origin;
						res.set("Content-Type", "text/html");
						res.send(content.toString());
					});
    			}
    		} else {
    			app.get(url, function(req, res) {
					const content = getIndex(element, req.session.pseudo);
					const token = req.headers.authorization;
					const origin = req.headers.origin;
					res.set("Content-Type", "text/html");
					res.send(content.toString());
				});
    		}
    	}
    });
};

setPages('pages');

app.get("/", function(req, res) {
	const content = getIndex('index', req.session.pseudo);
	const token = req.headers.authorization;
	const origin = req.headers.origin;
	res.set("Content-Type", "text/html");
	res.send(content.toString());
});

app.get("*", function(req, res) {
	const content = getIndex('404', req.session.pseudo);
	const token = req.headers.authorization;
	const origin = req.headers.origin;
	res.set("Content-Type", "text/html");
	res.send(content.toString());
});

module.exports = app;
