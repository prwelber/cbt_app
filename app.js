var express = require("express");
// var dotenv = require("dotenv").load();
var app = express();
var fs = require("fs");
var ejs = require("ejs");
var request = require('request');
var sqlite3 = require('sqlite3').verbose();
var _ = require('underscore');
var db = new sqlite3.Database('tool.db');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;

//middleware
// var bodyParser = require('body-parser');
// var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
// app.use(urlencodedBodyParser);
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static('public'));

//passport
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//views and view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//routes
app.use('/', require('./routes/learning.js'));

app.get('/cbt', function (req, res){
	console.log('index route hit');
	res.render('index', {
		title: "Character Building Tool",
		heading: "CBT for Dad"
	})

	db.all("SELECT * FROM users;", function(err, rows){
		console.log("rows from db:", rows);
	})
  
});

// app.get('/learning', function (req, res){
//   console.log('learning route hit');
//   res.render('learning', {});
// });

app.post('/users/create', function (req, res){
  console.log("req.body:", req.body);
  // db.run("INSERT INTO users (username, password, first_name, last_name, email) VALUES (?,?,?,?,?);", req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.email, function (err) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('inserted without error');
  //   }
  // });
  res.redirect('/learning');
});






















//config
app.listen(3000, function() {
  console.log("Forum on port 3000");
});