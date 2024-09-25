import { Meteor } from "meteor/meteor";
import { prisma } from "/prisma/client";

Meteor.methods({
	createUser: async (name: string, email: string) => {
		const user = await prisma.user.create({
			data: {
				name,
				email,
			},
		});
		return user;
	},
	findAllUsers: async () => {
		const users = await prisma.user.findMany();
		return users;
	},
});

Meteor.startup(async () => {
	// catch unhandled promise rejections
	process.on("unhandledRejection", async (err) => {
		await prisma.$disconnect();
		console.log(err);
		process.exit(1);
	});
});
