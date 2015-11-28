var express = require('express');
var app = express();
var router = express.Router();
console.log('learning route file loaded');


// define learning route
router.get('/learning', function (req, res){
	console.log('learning route hit');
	res.render('learning', {});
});

module.exports = router;