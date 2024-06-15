// create web server
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

// set up the express server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// get the comments
app.get("/comments", (req, res) => {
  res.sendFile(path.join(__dirname, "comments.json"));
});

// post the comments
app.post("/comments", (req, res) => {
  console.log(req.body);
  let comments = JSON.parse(
    fs.readFileSync(path.join(__dirname, "comments.json"))
  );
  comments.push(req.body);
  fs.writeFileSync(path.join(__dirname, "comments.json"), JSON.stringify(comments));
  res.send("comments.json updated");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
