const router = require("express").Router();
const {Post, Comment} = require("../db/models");

const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads");
	},
	filename: (req, file, cb) => {
		cb(null, `${file.fieldname}_${+new Date()}.jpg`);
	}
});

const upload = multer({
	storage
});

router.get("/", async (req, res, next) => {
	try {
		const posts = await Post.findAll();
		res.json(posts);
	} catch (error) {
		next(error);
	}
});

router.get("/:postId", async (req, res, next) => {
	try {
		const post = await Post.findOne({
			where: {
				id: req.params.postId
			},
			include: [{model: Comment}]
		});
		if (!post) {
			res.sendStatus(404);
		} else {
			res.json(post);
		}
	} catch (error) {
		next(error);
	}
});

router.post("/", upload.single("image"), async (req, res, next) => {
	try {
		const path = req.file.path.slice(8);
		const {
			title,
			description,
			date,
			shortcut,
			imageTitle,
			tag,
			credits,
			pictureDescription
		} = req.body;
		const entry = await Post.create({
			title,
			description,
			date,
			shortcut,
			imageTitle,
			tag,
			credits,
			pictureDescription,
			imageName: path
		});
		res.json(entry);
	} catch (error) {
		next(error);
	}
});

router.put("/", upload.single("image"), async (req, res, next) => {
	try {
		const path = req.file && req.file.path;
		const {
			id,
			title,
			description,
			date,
			shortcut,
			imageTitle,
			tag,
			credits,
			pictureDescription
		} = req.body;
		let params = {};
		if (path) {
			params = {
				title,
				description,
				date,
				shortcut,
				imageTitle,
				tag,
				credits,
				pictureDescription,
				imageName: path
			};
		} else {
			params = {
				title,
				description,
				date,
				shortcut,
				tag,
				credits,
				pictureDescription,
				imageTitle
			};
		}
		const post = await Post.update(params, {
			where: {
				id
			}
		});
		res.json(post);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	const {id} = req.params;
	await Post.destroy({
		where: {
			id
		}
	});
	res.json({
		deleted: id
	});
});

module.exports = router;
