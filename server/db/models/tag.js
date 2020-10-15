const Sequelize = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
	category: {
		type: Sequelize.ENUM("year", "team", "league", "other"),
		defaultValue: "other"
	},
	text: {
		type: Sequelize.STRING
	}
});

module.exports = Tag;
