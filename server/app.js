/**
 * Created by colinmiller on 11/23/15.
 */

var express = require('express');
var app = express();

//Routes
var index = require('./routes/index');
var plants = require('./routes/plants');

app.set("port", (process.env.PORT || 5000));

app.use("/plants", plants);
app.use("/", index);

app.listen(app.get("port"), function() {
    console.log("Take a listen to port: " + app.get("port"));
});