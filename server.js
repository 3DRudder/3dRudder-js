const express = require('express');
const http = require('http');
const url = require('url');
var path = require("path");

var fs = require("fs");
var options = {
    key: fs.readFileSync('device.key'),
    cert: fs.readFileSync('device.crt'),
    //passphrase: 'azerty'
  };

const app = express();
//app.set('port', 3000);
app.use('/dist', express.static('dist'));
//app.use('/examples/js', express.static('examples/js'));
//app.use(express.static('examples'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/examples/axis.html'));
});
app.get('*/js/*.*', function(req, res) {
    var u = req.url;   
    u = u.substring(u.search("/js/", u.length));
    res.sendFile(path.join(__dirname+'/examples' + u));
});
app.get('/video', function(req, res) {
    res.sendFile(path.join(__dirname+'/examples/video.html'));
});
app.get('/maps', function(req, res) {
    res.sendFile(path.join(__dirname+'/examples/maps.html'));
});
app.get('/webgl', function(req, res) {
    res.sendFile(path.join(__dirname+'/examples/webgl.html'));
});
app.get('/poly', function(req, res) {
    res.sendFile(path.join(__dirname+'/examples/poly.html'));
});
app.get('/sketchfab', function(req, res) {
    res.sendFile(path.join(__dirname+'/examples/sketchfab.html'));
});

const server = http.createServer(app);
server.listen(3000, function listening() {
    console.log('Listening on %d', server.address().port);
});