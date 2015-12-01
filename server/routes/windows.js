var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';

//pull the information necessary for window template
router.get('/', function (req,res){
    results = [];
    pg.connect(connectionString, function(err, client){
        console.log("The req.query is:", req.query);
        var windowName = req.query.windowName;
        var query = client.query("SELECT * \
            FROM windows WHERE name = $1", [windowName]);

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
