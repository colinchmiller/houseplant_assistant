var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';

//Using the username to get the rooms associated with that user
router.get('/', function (req,res){
    results = [];
    console.log("Is the correct req coming in?: ", req.user);
    pg.connect(connectionString, function(err, client, done){
        var query = client.query("SELECT * FROM windows\
            JOIN windowsassigned ON windowsassigned.window_id = windows.id\
            JOIN rooms ON windowsassigned.room_id = rooms.id\
            WHERE username = $1", [req.user]);

        //JOIN users ON rooms.user_id = users.id

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
