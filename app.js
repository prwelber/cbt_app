var express = require("express");
var app = express();
var fs = require("fs");
var ejs = require("ejs");
var sqlite3 = require('sqlite3').verbose();
var _ = require('underscore');
var db = new sqlite3.Database('tool.db');
var session = require('client-sessions');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');

//redis
var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
});

//middleware
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: true});
var methodOverride = require('method-override');

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

app.use(function (req, res, next) {
  if (req.session && req.session.user) {
    client.hgetall(req.session.user.username, function (err, user) {
      if (user) {
        req.user = user;
        delete req.user.password;
        req.session.user = user;
        res.locals.user = user;
      }
      next();
    });
  } else {
    next();
  }
});

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
  client.hgetall(req.body.username, function (err, result) {
    if (result) {
      res.json({status: "username already exists - please go back"})
    } else {
       db.run("INSERT INTO users (username, password, first_name, last_name, email) VALUES (?,?,?,?,?);", req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.email, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('inserted without error');
          client.hmset(req.body.username, {
            'username': req.body.username,
            'password': req.body.password,
            'first_name': req.body.first_name,
            'last_name': req.body.last_name,
            'email': req.body.email,
            'created': Date()
          });

        }
      });
    }
  })
  //pull user from Redis and send to user dashboard
  // client.hgetall(req.body.username, function (err, object) {
  //   if (err) {
  //     console.log(err);
  //   } else if (req.body.password === object.password) {
  //     console.log("this is the returned obejct from hgetall:", object);
  //     //sets a cookie with the user's information
  //     req.session.user = object;
  //     console.log('req.session.user:', req.session.user);
  //     res.redirect('/users/'+object.username+'');
  //   } else {
  //     console.log('password not correct');
  //     res.redirect('/cbt');
  //   }
  // })

  // db.all("SELECT * FROM users WHERE username='"+req.body.username+"';", function (err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else if (req.body.password === data.password) {
  //     //set cookie with user info
  //     req.session.user = data;
  //     res.redirect('/users/'+data.username);
  //   } else {
  //     console.log('password not correct');
  //     res.redirect('/cbt');
  //   }
  // })
});//END OF APP.POST to USERS/CREATE


app.post('/users/login', function (req, res) {
  client.hgetall(req.body.username, function (err, data) {
    if (err) {
      console.log(err);
    } else if (req.body.password === data.password) {
      req.session.user = data;
      res.cookie("user", data);
      res.redirect('/users/'+data.username);
    } else {
      console.log(data)
      console.log('password not correct');
      res.redirect('/index');
    }
  })

  // var query = "SELECT username, password FROM users WHERE username='" +req.body.username+"';"
  // db.all(query, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else if (req.body.password === result[0].password) {
  //     //set cookie with user info
  //     req.session.user = result;
  //     res.redirect('/users/'+result[0].username);
  //   } else {
  //     console.log(result[0])
  //     console.log('password not correct');
  //     res.redirect('/cbt');
  //   }
  // })
});


app.get('/users/:id', requireLogin, function (req, res) {
  console.log('user home page route hit');
  res.clearCookie('name');
  console.log(req.cookies.user);
    client.hgetall(req.session.user.username, function (err, user) {
      if (!user) {
        console.log('no user found sending back to index');
        req.session.destroy();
        res.redirect('/index');
      } else {
        console.log('user:', user);
        res.render('users_home', {
          name: user.first_name,
          username: user.username
        })
      }
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