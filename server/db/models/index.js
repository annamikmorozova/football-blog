const User = require("./user");
const Post = require("./post");
const Tag = require("./tag");
const SignedUser = require("./signedUser");

User.hasMany(Post);
Post.belongsTo(User);
Post.belongsToMany(Tag, {through: "PostTags"});
Tag.belongsToMany(Post, {through: "PostTags"});

module.exports = {
	User,
	Post,
	Tag,
	SignedUser
};
