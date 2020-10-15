const Sequelize = require("sequelize");
const db = require("../db");

const SignedUser = db.define("signedUser", {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
			notEmpty: true
		}
	}
});

module.exports = SignedUser;
