var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';

//test pull of the plant info to verify database connection
router.get('/', function (req,res){
  var param = req.query;
  console.log("req.query " + req.query);
  console.log("Param: " + param);
  console.log("light value: " + param.light);
  results = [];
  pg.connect(connectionString, function(err, client, done){
      var query = client.query("SELECT *\
          FROM plants\
          WHERE ? >= min_light\
          AND ?  <= max_light\
          AND ?  >= min_width\
          AND ?  >= min_height\
          AND ?  >= min_water\
          AND ? == cat\
          AND ?  == dog\
          AND ?  == human", [param.light, param.light, param.width, param.height, param.water, param.cat, param.dog, param.human]);

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
