const router = require("express").Router();
const {Image} = require("../db/models");
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
		const images = await Image.findAll();
		res.json(images);
	} catch (error) {
		next(error);
	}
});

router.get("/:imageId", async (req, res, next) => {
	try {
		const image = await Image.findByPk(req.params.imageId);
		if (!image) {
			res.sendStatus(404);
		} else {
			res.json(image);
		}
	} catch (error) {
		next(error);
	}
});

router.post("/", upload.single("image"), async (req, res, next) => {
	try {
		const path = req.file.path;
		const {name, description} = req.body;
		const entry = await Image.create({
			name,
			description,
			photoPath: path
		});
		res.json(entry);
	} catch (error) {
		next(error);
	}
});
router.put("/", upload.single("image"), async (req, res, next) => {
	try {
		const path = req.file && req.file.path;
		const {id, name, description} = req.body;
		let params = {};
		if (path) {
			params = {
				name,
				description,
				photoPath: path
			};
		} else {
			params = {
				name,
				description
			};
		}
		const photo = await Image.update(params, {
			where: {
				id
			}
		});
		res.json(photo);
	} catch (error) {
		next(error);
	}
});
router.delete("/:id", async (req, res, next) => {
	const {id} = req.params;
	await Image.destroy({
		where: {
			id
		}
	});
	res.json({
		deleted: id
	});
});

module.exports = router;
