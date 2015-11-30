var express = require('express');
var app = express();
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tool.db');

var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
    console.log('connected');
});


console.log('learning route file loaded');

// define learning route
router.get('/users/:id/learning', function (req, res){
  client.hgetall(req.params.id, function (err, data) {
    res.render('learning', {
      name: data.first_name
    });
  });	
});

router.post('users/:id/learning/create', function (req, res){
  console.log('learning post route hit');
});


module.exports = router;