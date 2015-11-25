//var express = require('express');
//var router = express.Router();
//var passport = require('passport');
//var path = require('path');
//var pg = require('pg');
//var Promise = require('bluebird');
//var bcrypt = Promise.promisifyAll(require('bcrypt'));
//var SALT_WORK_FACTOR = 10;
//
//var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';
//
//router.get('/', function(req, res){
//    res.sendFile(path.resolve(__dirname, '../public/assets/views/register.html'));
//});
//
//router.post('/', function(req, res, next){
//   var user = req.body;
//
//   bcrypt.genSaltAsync(SALT_WORK_FACTOR).then(function(err, salt){
//       if (err) return next(err);
//       var hashedPass = bcrypt.hashAsync(user.password, salt, function() {
//           console.log("The user password: ", user.password);
//           console.log("The hashed user password: ", hashedPass);
//           return hashedPass;
//       });
//   }).then(function(hashedPass){
//       pg.connect(connectionString, function(err, client, done){
//           if(err) console.log(err);
//           client.query('INSERT into users (username, password) VALUES ($1, $2)',
//           [req.body.username, hashedPass]), function(err, res) {
//               if (err) console.log(err);
//           }
//       });
//   });
//});
//
//module.exports = router;