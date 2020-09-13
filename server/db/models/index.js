const User = require("./user");
const Post = require("./post");
const Tag = require("./tag");

User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Tag);

module.exports = {
	User,
	Post,
	Tag
};
