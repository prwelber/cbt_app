var express = require('express');
var router = express.Router();


// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define learning route
router.get('/learning', function (req, res){
	console.log('learning route hit');
});