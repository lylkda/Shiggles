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

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback

router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// // GET /auth/google/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '#/' }), 
    function (req, res) {
        console.log(req)
        res.redirect('http://localhost:3000/home');
    });

// router.get('/auth/google',
//     passport.authenticate('google', {
//         scope:
//             ['https://www.googleapis.com/auth/plus.login',
//                 , 'https://www.googleapis.com/auth/plus.profile.emails.read']
//     }
//     ));

// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
//     }));

module.exports = router;