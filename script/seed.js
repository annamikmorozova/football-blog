"use strict";

if (process.env.NODE_ENV !== "production") require("../secrets");

const db = require("../server/db");
const {User, Post, Tag} = require("../server/db/models");
const {admins, posts, users, tags, postTags} = require("./seedData");

async function seed() {
	try {
		await db.sync({
			force: true
		});
		console.log("db synced!");

		const allUsers = [...admins, ...users];

		await Promise.all(
			allUsers.map(user => {
				return User.create(user);
			})
		);

		const allTags = [...tags];

		await Promise.all(
			allTags.map(tag => {
				return Tag.create(tag);
			})
		);

		const allPosts = [...posts];

		const createdPosts = await Promise.all(
			allPosts.map(post => {
				return Post.create(post);
			})
		);

		await Promise.all(
			createdPosts.map((post, i) => {
				return post.addTags(postTags[i]);
			})
		);

		console.log(`seeded ${users.length} users`);
		console.log(`seeded successfully`);
	} catch (error) {
		console.log(error);
	}
}

async function runSeed() {
	console.log("seeding...");
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log("closing db connection");
		await db.close();
		console.log("db connection closed");
	}
}

if (module === require.main) {
	runSeed();
}

module.exports = seed;
