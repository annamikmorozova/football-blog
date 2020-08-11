const router = require("express").Router();
const {Image} = require("../db/models");

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

module.exports = router;
