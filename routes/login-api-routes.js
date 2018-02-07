var db = require(".../models");

module.exports = function(app){
    app.get("/api/logins", function(req, res){
        db.User.findOne({
            where: {googleId: profile.id
            }
        }).then(function(dbLogin){
            res.json(dbLogin);
        })
     }
})
