let db = require('./index.js');




var User = db.sequelize.define("User", {
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    googleId: {
        type: db.Sequelize.STRING,
        allowNull: false,
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

User.sync({ force: true }).then(() => {

})

module.exports = User;

