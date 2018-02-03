var db = require('./index.js');




    var User = db.sequelize.define("User", {
        googleId: {
            type: db.Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: db.Sequelize.STRING,
            allowNull: false,
        }
    })

    User.sync({force: true}).then(()=>{

    })

    module.exports = User;

