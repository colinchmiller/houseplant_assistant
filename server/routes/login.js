var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    console.log("Testing the login route. req: ", req.username);
    res.send(req.username);
});

module.exports = router;
