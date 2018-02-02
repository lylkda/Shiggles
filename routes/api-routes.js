let db = require("../models");

module.exports = (app)=> {
	//GET the current question
	app.get("/api/questions", (req, res) => {
		db.NewQuestion.findAll({}).then((dbNewQuestion) => {
			console.log(res.json(dbNewQuestion));
		});
	});
};