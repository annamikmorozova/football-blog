const Sequelize = require("sequelize");
const db = require("../db");

const postImage = db.define("postImage", {
	imageCaption: {
		type: Sequelize.STRING
	},
	imageFile: {
		type: Sequelize.BLOB("long")
	}
});

module.exports = postImage;
