var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    console.log("Testing the login route. req: ", req.user);
    res.send(req.user);
});

module.exports = router;
