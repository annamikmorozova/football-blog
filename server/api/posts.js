const router = require("express").Router();
const {Post, Tag} = require("../db/models");

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
		const posts = await Post.findAll({
			include: [
				{
					model: Tag
				}
			]
		});
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
			include: [
				{
					model: Tag
				}
			]
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

router.post("/:id", upload.single("image"), async (req, res, next) => {
	try {
		const path = req.file && req.file.path;
		const {
			title,
			description,
			date,
			imageTitle,
			credits,
			pictureDescription
		} = req.body;
		let params = {};
		if (path) {
			params = {
				title,
				description,
				date,
				imageTitle,
				credits,
				pictureDescription,
				imageName: path
			};
		} else {
			params = {
				title,
				description,
				date,
				credits,
				pictureDescription,
				imageTitle
			};
		}
		const post = await Post.update(params, {
			where: {
				id: req.params.id
			}
		});
		res.json(post);
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
			imageTitle,
			credits,
			pictureDescription
		} = req.body;
		const entry = await Post.create({
			title,
			description,
			date,
			imageTitle,
			credits,
			pictureDescription,
			imageName: path
		});

		const tagIds = JSON.parse(req.body.tags).map(tag => tag.id);
		await entry.setTags(tagIds);

		res.json(entry);
	} catch (err) {
		next(err);
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
