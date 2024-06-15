// Create web server
// create a server
// create a server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var comments = require('./comments.json');

// Set up the server
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get the comments
app.get('/comments', function(req, res) {
  res.send(comments);
});

// Add a comment
app.post('/comments', function(req, res) {
  var comment = req.body;
  comments.push(comment);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
    res.send(comment);
  });
});

// Start the server
app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
