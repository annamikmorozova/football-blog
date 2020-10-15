const Sequelize = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
	category: {
		type: Sequelize.ENUM("год", "команда", "дивизион", "другие"),
		defaultValue: "другие"
	},
	text: {
		type: Sequelize.STRING
	}
});

module.exports = Tag;
