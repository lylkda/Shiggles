var express = require("express");
var router = express.Router();
var users = require("../models/users.js");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var path = require('path');
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

router.get("/home", function (req, res){
    res.sendFile(path.join(__dirname, "../public/guess.html"))
})

router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '#/' }), 
    function (req, res) {
        res.redirect('http://localhost:3000/home');
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;