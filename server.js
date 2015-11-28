var express = require('express');
var bodyParser = require('body-parser');
var db = require('mongoose');
db.connect("mongodb://localhost/cs5610");

var app = express();
// mongoose_hw.connect('mongodb://localhost/my_database');

// GET /style.css etc
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// assignment app
require('./public/assignment/server/app.js')(app, db);

console.log("SERVER LISTENING..");
app.listen(port, ipaddress);