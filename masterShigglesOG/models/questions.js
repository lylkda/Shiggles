let db = require('./index.js');


	let NewQuestions = db.sequelize.define("NewQuestions", {
		question: {
			type: db.Sequelize.STRING,
			// allowNull: false, 
			validate: {
				len: [1, 200]
			}
		},
		answer1: {
			type: db.Sequelize.STRING,
			// allowNull: false,
			validate: {
				len: [1, 75]
			}
		},
		answer2: {
			type: db.Sequelize.STRING,
			// allowNull: false,
			validate: {
				len: [1, 75]
			}
		},
		isCurrent: {
			type: db.Sequelize.BOOLEAN,
			defaultValue: false
		},
		a1Votes: { 
			type: db.Sequelize.INTEGER,
			defaultValue: 0
		},
		a2Votes: {
			type: db.Sequelize.INTEGER,
			defaultValue: 0
		},
		isComplete: {
			type: db.Sequelize.BOOLEAN,
			defaultValue: false
		},
		questionID: {
			type: db.Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		}
	});

	module.exports = NewQuestions;