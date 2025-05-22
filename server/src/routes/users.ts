import express from "express";
import { users } from "../data";
import type { User } from "../models/types";

export const usersRouter = express.Router();

// Get all users
usersRouter.get("/", (req, res) => {
	// Add artificial delay to simulate network latency
	setTimeout(() => {
		res.json({ status: "success", data: users });
	}, 200);
});

// Get a specific user
usersRouter.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const user = users.find((u) => u.id === id);

	if (!user) {
		return res.status(404).json({
			status: "error",
			message: `User with id ${id} not found`,
		});
	}

	res.json({ status: "success", data: user });
});

// Create a new user
usersRouter.post("/", (req, res) => {
	const { name, email, username } = req.body;

	if (!name || !email || !username) {
		return res.status(400).json({
			status: "error",
			message: "Name, email, and username are required",
		});
	}

	// Check if email is already taken
	if (users.some((u) => u.email === email)) {
		return res.status(400).json({
			status: "error",
			message: "Email is already taken",
		});
	}

	// Check if username is already taken
	if (users.some((u) => u.username === username)) {
		return res.status(400).json({
			status: "error",
			message: "Username is already taken",
		});
	}

	const newId = Math.max(0, ...users.map((u) => u.id)) + 1;

	const newUser: User = {
		id: newId,
		name,
		email,
		username,
	};

	users.push(newUser);

	res.status(201).json({ status: "success", data: newUser });
});

// Update a user
usersRouter.put("/:id", (req, res) => {
	const id = Number(req.params.id);
	const userIndex = users.findIndex((u) => u.id === id);

	if (userIndex === -1) {
		return res.status(404).json({
			status: "error",
			message: `User with id ${id} not found`,
		});
	}

	const { name, email, username } = req.body;

	// Check if email is already taken by another user
	if (email && users.some((u) => u.email === email && u.id !== id)) {
		return res.status(400).json({
			status: "error",
			message: "Email is already taken",
		});
	}

	// Check if username is already taken by another user
	if (username && users.some((u) => u.username === username && u.id !== id)) {
		return res.status(400).json({
			status: "error",
			message: "Username is already taken",
		});
	}

	const updatedUser = {
		...users[userIndex],
		...(name !== undefined && { name }),
		...(email !== undefined && { email }),
		...(username !== undefined && { username }),
	};

	users[userIndex] = updatedUser;

	res.json({ status: "success", data: updatedUser });
});

// Delete a user
usersRouter.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	const userIndex = users.findIndex((u) => u.id === id);

	if (userIndex === -1) {
		return res.status(404).json({
			status: "error",
			message: `User with id ${id} not found`,
		});
	}

	const [deletedUser] = users.splice(userIndex, 1);

	res.json({
		status: "success",
		data: { message: "User deleted successfully", user: deletedUser },
	});
});
