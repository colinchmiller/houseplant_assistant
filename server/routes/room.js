var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';

//Using the username to get the rooms associated with that user
router.get('/', function (req,res){
    results = [];
    pg.connect(connectionString, function(err, client, done){
        var query = client.query("SELECT * FROM rooms  \
        JOIN windowsassigned ON rooms.id = windowsassigned.room_id\
        JOIN windows ON windowsassigned.window_id = windows.id\
        WHERE user_id = $1", [req.query.username]);

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
