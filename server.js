var express = require('express');
var bodyParser = require('body-parser')
var mongoose_hw = require('mongoose'); // database connection for homework
var db = require('mongodb'); // PLACE HOLDER

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
require('./public/assignment/server/app.js')(app, mongoose_hw, db);

app.listen(port, ipaddress);