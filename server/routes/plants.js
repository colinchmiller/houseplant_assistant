var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';

//test pull of the plant info to verify database connection
router.get('/', function (req,res){
    results = [];
    pg.connect(connectionString, function(err, client, done){
        var query = client.query("SELECT * \
            FROM plants");

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