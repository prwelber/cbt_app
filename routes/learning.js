var express = require('express');
var app = express();
var router = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tool.db');

//middleware

function requireLogin (req, res, next) {
  if (!req.user) {
  	console.log('no req.user, redirecting to home')
    res.redirect('/cbt');
  } else {
    next();
  }
};

//redis
var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
});



// define learning route
router.get('/users/:id/learning', requireLogin, function (req, res){
  var query = "SELECT * FROM learning WHERE username='" +req.params.id+ "';";
  db.all(query, function (err, rows) {
  	if (err) {
  		console.log(err)
  	} else {
  	console.log(rows);
  	client.hgetall(req.params.id, function (err, data) {
  		res.render('learning', {
  			name:data.first_name,
  			username: data.username,
  			previousAnswers: rows
  		})
  	})
  	}
  })
});

router.post('/users/:id/learning/create', function (req, res){
  console.log('learning post route hit');

  db.run("INSERT INTO learning (username, user_id, answer1, answer2, answer3) VALUES (?,?,?,?,?);", req.body.username, 1, req.body.answer1, req.body.answer2, req.body.answer3, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('inserted without error');
      req.session.learning = true;
      res.redirect('/users/'+req.params.id);
    }
  });
});


module.exports = router;