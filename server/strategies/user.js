var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var pg = require('pg');
var bcrypt = require('bcrypt');

//Variables
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/houseplants';

//Serializer
passport.serializeUser(function(user, done){
    console.log('Serializer, what is the value of the username?', user.name);

    done(null, user.username);
});

//Deserializer
passport.deserializeUser(function(id, done){
    console.log('deserialize id is: ', id);
    pg.connect(connectionString, function(err, client){
        client.query("SELECT username, password FROM users\
        WHERE username = $1", [id],
        function(err, response){
            console.log("This is the response from the deserializeUser", response);
            username = response.rows[0].username;
            client.end();
            done(null, username);
        });
    });
});

//Local Strategy
passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
}, function(req, username, password, done) {
    //make DB call to get user's password on the post body
    console.log("Right before the DB call, req.body is: ", req.body);

    pg.connect(connectionString, function(err, client) {
        //send the password to the DB as well as pull out the info, that way we don't pull
        client.query("SELECT password FROM users\
        WHERE username = $1", [username], function (err, response){
            var dbPassword = response.rows[0].password;
            client.end();
            console.log("The password from the DB: ", dbPassword);
            console.log("The req.body after the SQL connection: ", req.body);

            bcrypt.compare(req.body.password, dbPassword, function(err, isMatch){
                if (err) return err;
                console.log("isMatch value for the comparison: ", isMatch);

                if(isMatch){
                    return done(null, req.body);
                } else {
                    return done(null, false, {message: 'FAILURE'});
                }
            });
        });
    });
}));

module.exports = passport;