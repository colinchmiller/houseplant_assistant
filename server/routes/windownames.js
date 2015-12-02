var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';

//getting the names for the windows assigned to each user
router.get('/', function (req,res){
    results = [];
    console.log("This is the username: ", req.user);

    pg.connect(connectionString, function(err, client, done){
        var query = client.query("SELECT name FROM windows \
            JOIN windowsassigned ON windowsassigned.window_id = windows.id \
            JOIN rooms ON windowsassigned.room_id = rooms.id\
            JOIN users on rooms.user_id = users.id\
            WHERE username = $1", [req.user]);

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            console.log("Did the correct content get located?:", results);
            return res.json(results);
        });

        if (err) {
            console.log(err);
        }
    });
});

module.exports = router;
