const router = require("express").Router();
const {Post} = require("../db/models");

router.get("/", async (req, res, next) => {
	try {
		const posts = await Post.findAll();
		console.log(posts);
		res.json(posts);
	} catch (error) {
		next(error);
	}
});

router.get("/:postId", async (req, res, next) => {
	try {
		const post = await Post.findByPk(req.params.postId);
		if (!post) {
			res.sendStatus(404);
		} else {
			res.json(post);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
