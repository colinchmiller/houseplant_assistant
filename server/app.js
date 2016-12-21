var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Routes
var index = require('./routes/index');
var plants = require('./routes/plants');
var windows = require('./routes/windows');
var windownames = require('./routes/windownames');
var windowplants = require('./routes/windowplants');
var room = require('./routes/room');
var roomlist = require('./routes/roomlist');

app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.use("/windows", windows);
app.use("/plants", plants);
app.use("/windownames", windownames);
app.use("/windowplants", windowplants);
app.use("/room", room);
app.use("/roomlist", roomlist);
app.use("/", index);

app.listen(app.get("port"), function() {
    console.log("Take a listen to port: " + app.get("port"));
});
