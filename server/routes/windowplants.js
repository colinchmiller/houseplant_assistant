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

module.exports = router;
