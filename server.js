// Dependencies

const express = require("express");
const bodyParser = require("body-Parser");
const exphbs = require("express-handlebars");

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

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Start app
db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("Now listening on: " + PORT);
	});
});