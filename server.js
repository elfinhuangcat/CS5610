var express = require('express');
var app = express();

// Serve static content for the app from the “public” 
// directory in the application directory:
// GET /style.css etc
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
