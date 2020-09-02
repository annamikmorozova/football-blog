const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {
	User,
	Post,
	Comment
};
