var express = require('express');
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';

//getting those plants that have been assigned to the window
router.get('/', function (req,res){
    results = [];
    console.log("This is the query for the plants in the window: ", req.query);

    pg.connect(connectionString, function(err, client, done){
        var windowPlants = req.query.windowId;
        console.log("This is the variable windowPlants: ", req.query.windowId);
        var query = client.query("SELECT * FROM plants \
            JOIN plantsassigned ON plants.id = plantsassigned.plant_id \
            WHERE plantsassigned.window_id = $1", [windowPlants]);

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

//posting plant and window data
router.post('/', function (req, res){
    console.log("This is the req.body: ", req.body);
    var plantname = req.body.plantdata[0];
    var windowId = req.body.windowId;
    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO plantsassigned (window_id, plant_id)\
        SELECT $1, id FROM plants \
        WHERE name = $2",
            [windowId, plantname],
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
