let db = require("../models");
let NewQuestions = require("../models/questions.js");

module.exports = (app)=> {

	app.get("/api/current/", (req, res) => {
		console.log(db.NewQuestion, db.NewQuestions);
		console.log(db.User);
		NewQuestions.findAll({
			where: {
				isCurrent: true
			}
		}).then((dbNewQuestion) => {
			res.json(dbNewQuestion);
		});
	});

	//get the completed questions
	app.get("/api/completed", (req, res) => {
		db.NewQuestion.findAll({
			where: {
				isComplete: true
			}
		}).then((dbNewQuestion) => {
			res.json(dbNewQuestion);
		});
	});

	app.post("/api/vote", (req, res) => {
		
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

	//POST completed question
	app.post("/api/completed", (req, res) => {
		db.NewQuestion.update(
		{
			isComplete: true,
			isCurrent: false
		},
		{
			where: {isCurrent: true}
		}).then((dbNewQuestion) => {
			res.json(dbNewQuestion)
		});
	});
};