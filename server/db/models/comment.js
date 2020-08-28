const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("order", {
	date: {
		type: Sequelize.DATEONLY,
		defaultValue: Date.now()
	},
	description: {
		type: Sequelize.TEXT
	}
});

module.exports = Comment;
