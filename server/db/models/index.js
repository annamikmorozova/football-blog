const User = require("./user");
const Post = require("./post");
const Image = require("./image");
const Comment = require("./comment");
const postImage = require("./postImage");

User.hasMany(Post);
Post.belongsToMany(Image, {through: postImage});
User.hasMany(Image);
User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {
	User,
	Post,
	Image,
	Comment,
	postImage
};
