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
    }).then((NewQuestions) => {
      // console.log(dbNewQuestion.dataValues);
      res.render('vote', NewQuestions[0].dataValues);
    });
  });

  app.post('/vote', function (req, res) { 
    var questionId = req.body.questionId;
    var answer = req.body.answer;

    NewQuestions.findAll({
      where: {
        questionID: questionId
      }
    }).then((NewQuestions) => {
      // console.log('NewQuestions', NewQuestions);
      var dbQuestion = NewQuestions[0].dataValues;
      var updateObj = {};
      if(answer === '1') { updateObj.a1Votes = dbQuestion.a1Votes + 1; }
      else { updateObj.a2Votes === dbQuestion.a2Votes + 1 }

        console.log("before vote applied")
      console.log(dbQuestion, updateObj);

      //updates votes into current question
      function updater (NewQuestions) {
        NewQuestions.update({
          a1Votes: updateObj.a1Votes,
          a2Votes: updateObj.a2Votes
        },
        {
          where: {
            isCurrent: true
          }
        }).then((NewQuestions) => {

        //checks if vote has been entered
        console.log("after vote applied")
        console.log(dbQuestion.a1Votes);
        console.log(updateObj.a1Votes);


        //closes current voting and finds a new question
        if(dbQuestion.a2Votes + dbQuestion.a1Votes === 4) {
          updateObj.isComplete = true;
          updateObj.isCurrent = false;

        //finds new question once current question is completed
        NewQuestions.findOne({
          where: { 
            isComplete: 0,
            questionID: { [Sequelize.Op.ne]: questionId } }
          }).then((newQ) => {
            console.log('newQ', newQ);
            NewQuestions.update({
              isCurrent: true
            },
            { where: { questionID: newQ[0].questionID } });
          });

        //updates the new DB question
        NewQuestions.update(updateObj,
        {
          where: { questionID: questionId}
        }).then((updatedDbQuestion) => {
          console.log('updatedDbQuestion', updatedDbQuestion);
          console.log(req, questionId, answer);
          res.render('vote', NewQuestions[0].dataValues);
        });

      } //closes if statement
    });
      }
      updater();



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
