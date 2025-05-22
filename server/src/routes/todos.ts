import express from "express";
import { todos } from "../data";
import type { Todo } from "../models/types";

export const todosRouter = express.Router();

// Get all todos
todosRouter.get("/", (req, res) => {
	// Support artificial delay for testing timeout/abort functionality
	const delay = req.query.delay ? Number(req.query.delay) : 300;

	// Add artificial delay to simulate network latency (helpful for learning)
	setTimeout(() => {
		// Support filtering by userId query parameter
		const userId = req.query.userId ? Number(req.query.userId) : undefined;

		if (userId) {
			const filteredTodos = todos.filter((todo) => todo.userId === userId);
			return res.json({ status: "success", data: filteredTodos });
		}

		res.json({ status: "success", data: todos });
	}, delay);
});

// Get a specific todo
todosRouter.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const todo = todos.find((t) => t.id === id);

	if (!todo) {
		return res.status(404).json({
			status: "error",
			message: `Todo with id ${id} not found`,
		});
	}

	res.json({ status: "success", data: todo });
});

// Create a new todo
todosRouter.post("/", (req, res) => {
	const { title, userId } = req.body;

	if (!title) {
		return res.status(400).json({
			status: "error",
			message: "Title is required",
		});
	}

	if (!userId) {
		return res.status(400).json({
			status: "error",
			message: "UserId is required",
		});
	}

	const newId = Math.max(0, ...todos.map((t) => t.id)) + 1;

	const newTodo: Todo = {
		id: newId,
		title,
		completed: false,
		userId,
	};

	todos.push(newTodo);

	res.status(201).json({ status: "success", data: newTodo });
});

// Update a todo
todosRouter.put("/:id", (req, res) => {
	const id = Number(req.params.id);
	const todoIndex = todos.findIndex((t) => t.id === id);

	if (todoIndex === -1) {
		return res.status(404).json({
			status: "error",
			message: `Todo with id ${id} not found`,
		});
	}

	const { title, completed, userId } = req.body;

	const updatedTodo = {
		...todos[todoIndex],
		...(title !== undefined && { title }),
		...(completed !== undefined && { completed }),
		...(userId !== undefined && { userId }),
	};

	todos[todoIndex] = updatedTodo;

	res.json({ status: "success", data: updatedTodo });
});

// Delete a todo
todosRouter.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	const todoIndex = todos.findIndex((t) => t.id === id);

	if (todoIndex === -1) {
		return res.status(404).json({
			status: "error",
			message: `Todo with id ${id} not found`,
		});
	}

	const [deletedTodo] = todos.splice(todoIndex, 1);

	res.json({
		status: "success",
		data: { message: "Todo deleted successfully", todo: deletedTodo },
	});
});
