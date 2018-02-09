console.log("loaded")
var express = require("express");
var path = require('path');
var router = express.Router();

var shiggles = require("../models/shiggles.js");

router.get("/", function (req, res) {
    // question.all(function (data) {
    //     var hbsObject = {
    //         questions: data
    //     };
    //     console.log(hbsObject);
    //     res.render("index", hbsObject);
    // });
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

module.exports = router;