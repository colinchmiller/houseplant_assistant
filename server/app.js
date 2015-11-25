var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Routes
var index = require('./routes/index');
var plants = require('./routes/plants');
//var register = require('./routes/register');

app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.use("/plants", plants);
//app.use("/register", register);
app.use("/", index);

app.listen(app.get("port"), function() {
    console.log("Take a listen to port: " + app.get("port"));
});