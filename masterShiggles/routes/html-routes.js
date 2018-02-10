var passport = require('passport');
let NewQuestions = require("./../models/questions.js");
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
    }).then((result) => {
      console.log(result[0].dataValues);
      res.render('vote', result[0].dataValues);
    });
  });

  app.post('/vote', function (req, res) { 
    var questionId = parseInt(req.body.questionId); 
    var answer = req.body.answer;

    NewQuestions.findAll({
      where: {
        questionID: questionId
      }
    }).then((result) => {
      // console.log('NewQuestions', NewQuestions);
      console.log("LOOKING");
      console.log(result[0].dataValues);
      var dbQuestion = result[0].dataValues;
      var updateObj = {};
      if(answer === '1') { updateObj.a1Votes = dbQuestion.a1Votes + 1; }
      else { updateObj.a2Votes = dbQuestion.a2Votes + 1 }

        console.log("before vote applied");
      console.log(dbQuestion, updateObj);

        //closes current voting and finds a new question
        var nextQuestion = false;
        if(dbQuestion.a2Votes + dbQuestion.a1Votes === 4) {
          nextQuestion = true;
          updateObj.isComplete = true;
          updateObj.isCurrent = false;

        //finds new question once current question is completed
      }
        //updates the new DB question
        NewQuestions.update(updateObj,
        {
          where: { questionID: questionId}
        }).then((updatedDbQuestion) => {
          // console.log('updatedDbQuestion', updatedDbQuestion);
          if (nextQuestion) {
            NewQuestions.findOne({
              where: { 
                isComplete: 0,
                }
              }).then((newQ) => {
                console.log("LOOK HERE");
                console.log('newQ', newQ[0]);
                NewQuestions.update({
                  isCurrent: true
                },
                { where: { questionID: newQ.dataValues.questionID } 
              });
              });

            }
          // console.log(req, questionId, answer);
          // res.render('vote', updatedDbQuestion.dataValues);
          res.redirect("/thanks"); 
        
        });

      });
  });

  app.get('/guess', function (req, res) {
    res.render('guess');
  });

   app.get('/thanks', function (req, res) {
    res.render('thanks');
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
