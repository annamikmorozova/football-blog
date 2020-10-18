const router = require("express").Router();
const {Tag} = require("../db/models");

router.get("/", async (req, res, next) => {
	try {
		const tags = await Tag.findAll();
		res.json(tags);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const newTag = await Tag.create({
			category: req.body.category,
			text: req.body.text
		});
		res.json(newTag);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
