var express = require('express'),
    app = express();

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.get('/geoFind.js', function(req, res) {
  res.sendfile('geoFind.js');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Server running at' + port);
});


// var http = require('http'),
//     fs = require('fs');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end(fs.readFileSync(__dirname + '/index.html'));
// }).listen(8080, null);

// console.log('Server running at http://127.0.0.1:8080/');