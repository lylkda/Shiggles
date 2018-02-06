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
}
  