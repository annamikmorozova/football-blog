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
	date: {
		type: Sequelize.DATE,
		defaultValue: Date.now()
	},
	description: {
		type: Sequelize.TEXT
	},
	shortcut: {
		type: Sequelize.TEXT
	},
	imageName: {
		type: Sequelize.STRING
	},
	imageTitle: {
		type: Sequelize.STRING
	},
	credits: {
		type: Sequelize.STRING
	},
	pictureDescription: {
		type: Sequelize.STRING
	}
});

module.exports = Post;
