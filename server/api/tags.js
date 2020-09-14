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

module.exports = router;
