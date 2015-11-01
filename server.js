var express = require('express');
var httpProxy = require('http-proxy');
var app = express();

var apiForwardingUrl = 'https://api.edamam.com/search?';

// GET /style.css etc
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var apiProxy = httpProxy.createProxyServer();
// Grab all requests to the server with "/space/".
app.all("/search/*", function(req, res) {
    console.log("Request made to /space/");
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

app.listen(port, ipaddress);
