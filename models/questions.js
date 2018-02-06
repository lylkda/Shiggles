module.exports = function(sequelize, DataTypes) {
	let NewQuestion = sequelize.define("NewQuestion", {
		question: {
			type: DataTypes.STRING,
			allowNull: false, 
			validate: {
				len: [1, 200]
			}
		},
		answer1: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 75]
			}
		},
		answer2: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 75]
			}
		},
		isCurrent: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		a1Votes: {
			type: DataTypes.INTEGER
		},
		a2Votes: {
			type: DataTypes.INTEGER
		},
		isComplete: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		questionID: {
			type: DataTypes.INTEGER,
			primaryKey: true
		}
	});

	return NewQuestion;

};