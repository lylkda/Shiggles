// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var shiggles = {
  all: function(cb) {
    orm.all("shiggles", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("shiggles", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(question-input, cb) {
    orm.update(question-input, function(res) {
      cb(res);
    });
  }
};

module.exports = shiggles;
