// Dependencies

const express = require("express");
const bodyParser = require("body-Parser");
const exphbs = require("express-handlebars");
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const sequelize = require('sequelize');

let app = express();
let PORT = process.env.PORT || 3000;
let db = require("./models");

// Body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

// //set GoogleStrategy for Login
const User = require("./models/users.js")
passport.use(new GoogleStrategy({
	clientID: "516474851739-gagoom3cg4vi7bdn2idvk8q8gn3sp4h5.apps.googleusercontent.com",
	clientSecret: "kZzc6NSIEpveTLQF8I0-E3EK",
	callbackURL: "http://localhost:3000/auth/google/callback"
},
	function (accessToken, refreshToken, profile, done) {
		User.findOrCreate({
			where: { googleId: profile.id },
			defaults: { username: profile.displayName }
		})
			.then(function (user, err) {
				return done(err, user);
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

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
// require("./routes/login.js")(app);

// Start app
db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("Now listening on: " + PORT);
	});
});