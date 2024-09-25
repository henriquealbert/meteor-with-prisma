import type { User } from "@prisma/client";
import { Meteor } from "meteor/meteor";
import React from "react";
import { type FormEvent, useEffect, useState } from "react";
import { Hello } from "./Hello";

export const App = () => {
	const [users, setUsers] = useState<User[]>([]);
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		await Meteor.callAsync("createUser", name, email);
	};

	useEffect(() => {
		async function loadUsers() {
			const users = await Meteor.callAsync("findAllUsers");

			setUsers(users);
		}
		loadUsers();
	}, []);

	return (
		<div>
			<h1>Welcome to Meteor!</h1>
			<Hello />

			<form onSubmit={onSubmit}>
				<input type="text" name="name" placeholder="Name" />
				<input type="email" name="email" placeholder="Email" />
				<button type="submit">Create User</button>
			</form>
			{users.map((user) => (
				<p key={user.id}>{user.name}</p>
			))}
		</div>
	);
};
