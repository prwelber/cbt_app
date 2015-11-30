var express = require("express");
// var dotenv = require("dotenv").load();
var app = express();
var fs = require("fs");
var ejs = require("ejs");
var request = require('request');
var sqlite3 = require('sqlite3').verbose();
var _ = require('underscore');
var db = new sqlite3.Database('tool.db');

//redis
var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
    console.log('connected');
  });

// var passport = require('passport');
// var Strategy = require('passport-local').Strategy;

//middleware
var session = require('express-session');

app.use(session({secret: 'ssshhhhh'}));

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedBodyParser);
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static('public'));
// var RedisStore = require('connect-redis')(express);
// app.use(express.session({ store: new RedisStore }));

//passport
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

//views and view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//routes
app.use('/', require('./routes/learning.js'));



var sess;
app.get('/cbt', function (req, res){
  console.log('index route hit');
  sess = req.session;
  if (sess.email) {
    console.log('session found')
  } else {
    res.render('index', {
      title: "Character Building Tool",
      heading: "CBT for Dad"
    })
  }
	
	// db.all("SELECT * FROM users;", function(err, rows){
	// 	console.log("rows from db:", rows);
	// })  
});//end of (GET '/cbt')

// app.get('/learning', function (req, res){
//   console.log('learning route hit');
//   res.render('learning', {});
// });

app.post('/users/create', function (req, res){
  console.log("req.body:", req.body);
  sess = req.session;
  sess.email = req.body.email;
  sess.username = req.body.username;
  sess.firstName = req.body.first_name;
  client.hmset(req.body.username, {
    'username': req.body.username,
    'password': req.body.password,
    'first_name': req.body.first_name,
    'last_name': req.body.last_name,
    'email': req.body.email,
    'created': Date()
  });

  client.hgetall(req.body.username, function (err, object) {
    if (err) {
      console.log(err);
    } else {
      console.log("this is the returned obejct from hgetall:", object);
      res.redirect('/users/'+object.username+'/home');
    }
  })
  // db.run("INSERT INTO users (username, password, first_name, last_name, email) VALUES (?,?,?,?,?);", req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.email, function (err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('inserted without error');
  //   }
  // });
  
  // db.all("SELECT * FROM users;", function (err, rows) {
  //   console.log(rows);
  // });
});//END OF APP.POST to USERS/CREATE

app.get('/users/:id', function (req, res) {
  console.log('user home page route hit');
  sess = req.session;
  if (sess.username) {
    console.log(sess.username + " is the username");
    console.log(req.session);
    client.hgetall(req.params.id, function (err, object) {
      console.log(object);
      res.render('users_home', {
        name: object.first_name,
        username: object.username
      });
    });
  } else {
    console.log('need to log in');
  }
  // db.all("SELECT * FROM users;", function (err, rows) {
  //   console.log(rows);  
  // })  

  
});





















//config
app.listen(3000, function() {
  console.log("Forum on port 3000");
});