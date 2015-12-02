var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('./strategies/user');
var session = require('express-session');

//Routes
var index = require('./routes/index');
var plants = require('./routes/plants');
var windows = require('./routes/windows');
var windownames = require('./routes/windownames');
var windowplants = require('./routes/windowplants');
var room = require('./routes/room');
var roomlist = require('./routes/roomlist');
var register = require('./routes/register');
var login = require('./routes/login');



app.set("port", (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));


//Passport Session Configuration
app.use(session({
    secret: 'secret',
    //the key matches the user being returned in login.js. Many Bathans died giving us this informatio;;
    key: 'user',
    resave: 'true',
    saveUnintialized: false,
    cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/windows", windows);
app.use("/plants", plants);
app.use("/windownames", windownames);
app.use("/windowplants", windowplants);
app.use("/room", room);
app.use("/roomlist", roomlist);
app.use("/register", register);
app.use("/login", login);
app.use("/", index);

app.listen(app.get("port"), function() {
    console.log("Take a listen to port: " + app.get("port"));
});