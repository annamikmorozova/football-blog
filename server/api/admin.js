const router = require("express").Router();
const {User, Post, SignedUser} = require("../db/models");

function adminOnly(req, res, next) {
	if (req.user.role === "admin") {
		next();
	} else {
		return res.status(403).send("Admin access only");
	}
}

router.put("/:postId", adminOnly, async (req, res, next) => {
	try {
		const [numOfAffectedRows, affectedRows] = await Post.update(req.body, {
			where: {
				id: req.params.postId
			},
			returning: true,
			plain: true
		});
		if (!affectedRows) {
			res.sendStatus(404);
		} else {
			res.json(affectedRows);
		}
	} catch (error) {
		next(error);
	}
});

router.post("/", adminOnly, async (req, res, next) => {
	try {
		const post = req.body;
		const createPost = await Post.create(post);
		res.json(createPost);
	} catch (error) {
		next(error);
	}
});

router.post("/users", async (req, res, next) => {
	try {
		const user = await SignedUser.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email
		});
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.delete("/:postId", adminOnly, async (req, res, next) => {
	try {
		await Post.destroy({
			where: {
				id: req.params.postId
			}
		});
		res.json(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
