const router = require("express").Router();
const {Post, Tag} = require("../db/models");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: () => "football-blog"
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
		const {
			title,
			description,
			date,
			imageTitle,
			credits,
			pictureDescription
		} = req.body;

		let params = {
			title,
			description,
			date,
			imageTitle,
			credits,
			pictureDescription
		};

		if (req.file && req.file.path) {
			params.imageName = req.file.path;
		}

		await Post.update(params, {
			where: {
				id: req.params.id
			}
		});

		const existingPost = await Post.findOne({
			where: {
				id: req.params.id
			}
		});

		const tagIds = JSON.parse(req.body.tags).map(tag => tag.id);
		await existingPost.setTags(tagIds);

		res.json(existingPost);
	} catch (error) {
		next(error);
	}
});

router.post("/", upload.single("image"), async (req, res, next) => {
	try {
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
			imageName: req.file.path
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
