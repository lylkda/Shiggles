module.exports = function(sequelize, DataTypes) {
	let Votes = sequelize.define('votes', {
		userid: {
			type: DataTypes.INTEGER,

		},
		questionId: {
			type: DataTypes.INTEGER
		},
		answer: {
			type: DataTypes.BOOLEAN
		}

		return Votes;
	})
}