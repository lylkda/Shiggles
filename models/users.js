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
        },
        points: {
            type: db.Sequelize.INTEGER,
            defaultValue: 0
        }
    })

    User.sync({force: true}).then(()=>{

    })

    module.exports = User;

