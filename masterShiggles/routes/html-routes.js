var passport = require('passport');
let NewQuestions = require("../models/questions.js");
const Sequelize = require('Sequelize');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/home', function (req, res) {
    res.render('leaderboard');
  });

  app.get('/vote', function (req, res) {
    console.log(req.user);
    NewQuestions.findAll({
      where: {
        isCurrent: true
      }
    }).then((dbNewQuestion) => {
      console.log(dbNewQuestion.dataValues);
      res.render('vote', dbNewQuestion[0].dataValues);
    });
  });

  app.post('/vote', function (req, res) { 
    var questionId = req.body.questionId;
    var answer = req.body.answer;

    NewQuestions.findAll({
      where: {
        questionID: questionId
      }
    }).then((dbNewQuestion) => {
      console.log('dbNewQuestion', dbNewQuestion);
      var dbQuestion = dbNewQuestion[0].dataValues;
      var updateObj = {};
      if(answer === '1') { updateObj.a1Votes = dbQuestion.a1Votes + 1; }
      else { updateObj.a2Votes = dbQuestion.a2Votes + 1 }

console.log(dbQuestion, updateObj);
        if(dbQuestion.a2Votes + dbQuestion.a1Votes === 4) {
          updateObj.isComplete = true;
          updateObj.isCurrent = false;

          NewQuestions.findOne({
            where: { questionID: { [Sequelize.Op.ne]: questionId } }
          }).then((newQ) => {
            console.log('newQ', newQ);
            NewQuestions.update({
              isCurrent: true
            },
            { where: { questionID: newQ[0].questionID } });
          });
        }
        

        NewQuestions.update(updateObj,
        {
          where: { questionID: questionId}
        }).then((updatedDbQuestion) => {
          console.log('updatedDbQuestion', updatedDbQuestion);
          //console.log(req, questionId, answer);
          res.render('vote');
        });

      });
  });

  app.get('/guess', function (req, res) {
    res.render('guess');
  });

  app.get('/history', function (req, res) {
    res.render('history');
  });

  app.get('/submit', function (req, res) {
    res.render('submit');
  });

  // login routes
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '#/' }),
    function (req, res) {
      res.redirect('http://localhost:3000/home');
    });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
}
