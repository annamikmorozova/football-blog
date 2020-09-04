const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
	date: {
		type: Sequelize.DATE,
		defaultValue: Date.now()
	},
	description: {
		type: Sequelize.TEXT
	}
});

module.exports = Comment;
