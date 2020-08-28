const Sequelize = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	// date: {
	// 	type: Sequelize.DATE,
	// 	defaultValue: Date.now()
	// },
	description: {
		type: Sequelize.TEXT
	}
	// imageUrl: {
	// 	type: Sequelize.TEXT
	// }
});

module.exports = Post;
