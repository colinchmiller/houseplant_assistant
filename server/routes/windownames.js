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
            JOIN users ON windowsassigned.user_id = users.id\
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

router.post('/', function (req, res){
    var windowId = req.body.windowId;
    var username = req.body.username;
    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO windowsassigned (window_id, user_id)\
        SELECT $1, id FROM users\
        WHERE username = $2",
            [windowId, username],
            function (err, response){
                if (err){
                    console.log(err);
                } else{
                    console.log("This is the res: ", response);
                    client.end();
                    res.send(response);
                }
            });
        if (err){
            console.log(err);
        }

    });
});

module.exports = router;
