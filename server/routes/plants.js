var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';

//test pull of the plant info to verify database connection
router.get('/', function (req,res){
  var param = req.query;
  console.log("req.query " + req.query);
  console.log("Param: " + param);
  console.log("dog value: " + param.dog);
  results = [];
  pg.connect(connectionString, function(err, client, done){
      var query = client.query("SELECT * FROM plants WHERE $1 >= min_light AND $2  <= max_light AND $3  >= min_width AND $4  >= min_height AND $5 >= min_water AND $6 = cat AND $7 = dog AND $8 = human",
       [param.light, param.light, param.width, param.height, param.water, param.cat, param.dog, param.human]);

      query.on('row', function(row){
          results.push(row);
      });

      query.on('end', function(){
          client.end();
          return res.json(results);
      });

      if (err) {
          console.log(err);
      }
    });
});
module.exports = router;
