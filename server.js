//dependencies

let express = require("express");
let bodyParser = require("body-Parser");

let app = express();
const PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

//routes
require("./routes/api-routes.js")(app);

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("Now listening on: " + PORT);
	});
});