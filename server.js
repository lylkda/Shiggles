let express = require("express");
let bodyParser = require('body-parser');
let passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var sequelize = require('sequelize');


const PORT = process.env.PORT || 3000;

let app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//set GoogleStrategy for Login
const User = require("./models/users.js")
passport.use(new GoogleStrategy({
    clientID: "516474851739-gagoom3cg4vi7bdn2idvk8q8gn3sp4h5.apps.googleusercontent.com",
    clientSecret: "kZzc6NSIEpveTLQF8I0-E3EK",
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({
            where: { googleId: profile.id},
            defaults: { username: profile.displayName}
        })
        .then( function (user, err) {
            return done(err,user);
        });
    }
));



app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, callback) {
    console.log('serializing user.');
    callback(null, user);
});

passport.deserializeUser(function (user, callback) {
    console.log('deserialize user.');
    callback(null, user);
});

// Import routes and give the server access to them.
var routes = require("./controllers/login.js");



app.use('/', routes);

app.listen(PORT, function () {
    console.log("App now listening at localhost:" + PORT);
});
