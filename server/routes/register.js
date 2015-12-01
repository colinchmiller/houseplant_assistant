var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var SALT_WORK_FACTOR = 10;

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';

router.get('/', function (req, res, next){
    res.sendFile(path.resolve(__dirname, '../public/assets/views/routes/register.html'));
});

router.post('/', function(req, res, next){
    var user = req.body;

    bcrypt.genSaltAsync(SALT_WORK_FACTOR).then(function(salt){
        return bcrypt.hashAsync(user.password, salt);
    }).then(function(hash){
        user.password = hash;
        pg.connect(connectionString, function (err, client){
            if(err) console.log(err);
            client.query("INSERT INTO users (username, password)\
            VALUES ($1, $2)", [req.body.username, req.body.password],
            function(err, res){
                if (err) console.log(err);
                //res.redirect('/');
            });
            res.redirect('/'); //This is where it used to be
        });
    });

});

module.exports = router;