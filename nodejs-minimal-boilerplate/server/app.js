import fs from "fs";
import express from "express";
import bodyParser from "body-parser";

const app = express();

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

app.post("/post-example", (req, res) => {
  console.log(req.body);
  res.set("Content-Type", "application/json");
  res.send(req.body);
});

module.exports = app;
