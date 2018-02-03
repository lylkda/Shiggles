let db = require("../models");

module.exports = (app)=> {
	//GET the current question
	app.get("/api/questions", (req, res) => {
		db.NewQuestion.findAll({
			where: {
				isCurrent: true
			}
		}).then((dbNewQuestion) => {
			res.json(dbNewQuestion);
		});
	});

	//POST new questions
	app.post("/api/questions", (req, res) => {
		db.NewQuestion.create({
			question: req.body.question,
			answer1: req.body.answer1,
			answer2: req.body.answer2
		}).then((dbNewQuestion) => {
			res.json(dbNewQuestion);
		});
	});
};