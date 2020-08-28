const Sequelize = require("sequelize");
const db = require("../db");

const Image = db.define("image", {
	// data: {
	// 	type: Sequelize.BLOB("long")
	// },
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING
	}
});

module.exports = Image;
