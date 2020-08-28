const Sequelize = require("sequelize");
const db = require("../db");

const Image = db.define("image", {
	data: {
		type: Sequelize.BLOB
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	type: {
		type: Sequelize.STRING
	}
});

module.exports = Image;
