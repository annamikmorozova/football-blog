const Sequelize = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
	category: {
		type: Sequelize.ENUM("year", "team", "unnamed"),
		defaultValue: "unnamed"
	},
	text: {
		type: Sequelize.STRING
	}
});

module.exports = Tag;
