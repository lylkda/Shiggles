var express = require("express");

var router = express.Router();

var shiggles = require("../models/shiggles.js");

router.get("/", function (req, res) {
    question.all(function (data) {
        var hbsObject = {
            questions: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/shiggles", function (req, res) {
    question.create([
        "question-input"
    ], [
            req.body.question
        ], function (data) {
            res.redirect("/");
        });
});

router.post("/shiggles/:id", function (req, res) {
    question.update(req.params.id, function() {
        res.redirect("/");
    });
});

module.exports = router;
