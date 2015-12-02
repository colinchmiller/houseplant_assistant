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
        console.log("This is the windowName: ", windowName);
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

router.post('/', function (req, res){
    var window = req.body.windowdata[0];
    console.log("The window variable is: ", window);
    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO windows (name, compass, care_lvl, kids, dogs, cats, height, width)\
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [window.name, window.compass, window.care_lvl, window.kids, window.dogs, window.cats, window.height, window.width],
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
