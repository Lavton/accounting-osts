var express = require('express');
var path = require('path');
var app = express();
fs = require('fs');



app.use(express.static(path.join(__dirname, '..')));

app.get('/*', function (req, res) {

    fs.readFile(path.join(__dirname, '..', 'index.html'), 'utf-8', function(err, data) {
       if (err) {
           return;
       }
        res.send(data);
    });

});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)

});