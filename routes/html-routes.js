var passport = require('passport');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/home', function (req, res) {
    res.render('leaderboard');
  });

  app.get('/vote', function (req, res) {
    res.render('vote');
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
