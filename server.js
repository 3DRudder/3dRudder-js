const express = require('express');
const http = require('http');
const url = require('url');
var path = require("path");

const app = express();

app.use('/dist', express.static('dist'));
app.use('/js', express.static('examples/js'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/examples/axis.html'));
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
const server = http.createServer(app);
server.listen(3000, function listening() {
    console.log('Listening on %d', server.address().port);
});