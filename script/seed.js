"use strict";

const db = require("../server/db");
const {User, Post, Comment} = require("../server/db/models");
const {admins, posts, users, comments} = require("./seedData");

async function seed() {
	try {
		await db.sync({
			force: true
		});
		console.log("db synced!");

		let allPosts = [...posts];

		await Promise.all(
			allPosts.map(post => {
				return Post.create(post);
			})
		);

		const allUsers = [...admins, ...users];

		await Promise.all(
			allUsers.map(user => {
				return User.create(user);
			})
		);

		const allComments = [...comments];

		await Promise.all(
			allComments.map(comment => {
				return Comment.create(comment);
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
