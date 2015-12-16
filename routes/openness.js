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
    res.redirect('/index');
  } else {
    next();
  }
};

//redis
var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
});


// define humility route
router.get('/users/:id/openness', /*requireLogin,*/ function (req, res){
  db.all("SELECT * FROM openness WHERE username = ?",req.params.id, function (err, rows) {
    if (err) {
      console.log(err)
    } else {
    console.log(rows);
    client.hgetall(req.params.id, function (err, data) {
      res.render('openness', {
        name:data.first_name,
        username: data.username,
        rows: rows
      });
    });
    }
  })
});

router.post('/users/:id/openness/create', function (req, res){
  db.run("INSERT INTO openness (username, user_id, question1, answer1, question2, answer2, question3, answer3, random) VALUES (?,?,?,?,?,?,?,?,?);", req.body.username, 1, req.body.question1, req.body.answer1, req.body.question2, req.body.answer2, req.body.question3, req.body.answer3, req.body.random_thought, function (err) {
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


