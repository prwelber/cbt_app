var express        = require("express"),
    app            = express(),
    fs             = require("fs"),
    ejs            = require("ejs"),
    sqlite3        = require('sqlite3').verbose(),
    _              = require('underscore'),
    db             = new sqlite3.Database('tool.db'),
    session        = require('client-sessions'),
    sassMiddleware = require('node-sass-middleware'),
    path           = require('path');

//middleware
var session              = require('express-session'),
    bodyParser           = require('body-parser'),
    cookieParser         = require('cookie-parser'),
    urlencodedBodyParser = bodyParser.urlencoded({extended: true}),
    methodOverride       = require('method-override');

app.use(cookieParser());
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
//app.use(express.static('public'));

// adding the sass middleware
app.use(
   sassMiddleware({
       src: __dirname + '/sass', 
       dest: __dirname + '/public',
       debug: true,    
   })
);   

// The static middleware must come after the sass middleware
app.use(express.static( path.join( __dirname, 'public' ) ) );

app.use(session({
  path: '/',
  cookieName: 'session',
  secret: 'random_stringgggggg',
  duration: 45 * 60 * 1000,
  resave: true,
  saveUninitialized: true,
  activeDuration: 30 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/index');
  } else {
    console.log('req.session.user found, moving forward');
    next();
  }
}

//views and view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//routes
app.use('/', require('./routes/learning.js'));
app.use('/', require('./routes/humility.js'));
app.use('/', require('./routes/openness.js'));
app.use('/', require('./routes/tolerance.js'));
app.use('/', require('./routes/generosity.js'));
app.use('/', require('./routes/honesty.js'));
app.use('/', require('./routes/autonomy.js'));



app.get('/', function (req, res) {
  res.render('landing');
})

app.get('/index', function (req, res){
  console.log("req.cookies.name from GET /cbt", req.cookies.name);
  console.log("req.session.user from GET /cbt", req.session.user);
  res.cookie("name", "Phil");
  res.render('index');
});

app.post('/users/create', function (req, res){
  console.log("req.body:", req.body);
  //create user in DB if username does not already exist

  db.all("SELECT * FROM users where username = ?", req.body.username, function (err, data) {
    if (err) {
      console.log(err)
    } else if (results) {
        res.json({status: "username already exists, please go back and choose a different username"});
    } else {
       db.run("INSERT INTO users (username, password, first_name, last_name, email) VALUES (?,?,?,?,?);", req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.email, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('inserted without error');
          req.session.user = req.body.username
          res.redirect('/users/'+req.body.username);
        }
      });
    }
  });
})  //END OF APP.POST to USERS/CREATE


app.post('/users/login', function (req, res) {
  var query = "SELECT username, password FROM users WHERE username = ?"
  db.all(query, req.body.username, function (err, result) {
    if (err) {
      console.log(err);
    } else if (req.body.password === result[0].password) {
      //set cookie with user info
      req.session.user = result[0];
      res.cookie("user", result);
      res.redirect('/users/'+result[0].username);
    } else {
      console.log(result)
      console.log('password not correct');
      res.redirect('/cbt');
    }
  })
});


app.get('/users/:id', requireLogin, function (req, res) {
  //res.clearCookie('name');
  console.log("req.cookies.user", req.cookies.user);
  console.log("req.session.user", req.session.user);
  res.render('users_home', {
    username: req.params.id
  })
});

app.post('/users/:id/past', function (req, res) {
  db.all("SELECT * FROM " +req.body.values+ " WHERE username = ?", req.params.id, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log(data);
      res.render('past_answers', {
        data: data,
        username: req.params.id
      })
    }
  })
});


app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});


//config
app.listen(3000, function () {
  console.log("Listening on port 3000");
});