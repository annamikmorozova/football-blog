const router = require("express").Router();
const {User, Post, Image} = require("../db/models");

function adminOnly(req, res, next) {
	if (req.user.role === "admin") {
		next();
	} else {
		return res.status(403).send("Admin access only");
	}
}

// Admins can see all users
router.get("/", adminOnly, async (req, res, next) => {
	try {
		const users = await User.findAll({
			attributes: ["id", "firstName", "lastName", "email"]
		});
		res.json(users);
	} catch (error) {
		next(error);
	}
});

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

router.put("/:imageId", adminOnly, async (req, res, next) => {
	try {
		const [numOfAffectedRows, affectedRows] = await Image.update(req.body, {
			where: {
				id: req.params.imageId
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

router.post("/", adminOnly, async (req, res, next) => {
	try {
		const image = req.body;
		const createImage = await Image.create(image);
		res.json(createImage);
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

router.delete("/:imageId", adminOnly, async (req, res, next) => {
	try {
		await Image.destroy({
			where: {
				id: req.params.imageId
			}
		});
		res.json(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
