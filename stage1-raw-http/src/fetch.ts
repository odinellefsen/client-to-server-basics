import { $, API_URL, getValue, isChecked, outputResponse } from "./index";
import type { Todo } from "./types";

// Store the current AbortController for cancel functionality
let currentController: AbortController | null = null;

// Get all todos using fetch
$("#fetch-get-todos").addEventListener("click", async () => {
	try {
		const response = await fetch(`${API_URL}/todos`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		outputResponse(data, "GET", `${API_URL}/todos`);
	} catch (error) {
		if (error instanceof Error) {
			outputResponse(
				{
					status: "error",
					message: error.message,
				},
				"GET",
				`${API_URL}/todos`,
			);
		}
	}
});

// Get todo by ID using fetch
$("#fetch-get-todo-by-id").addEventListener("click", async () => {
	const todoId = getValue("#fetch-todo-id");

	if (!todoId) {
		outputResponse({
			status: "error",
			message: "Please enter a todo ID",
		});
		return;
	}

	try {
		const response = await fetch(`${API_URL}/todos/${todoId}`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		outputResponse(data, "GET", `${API_URL}/todos/${todoId}`);
	} catch (error) {
		if (error instanceof Error) {
			outputResponse(
				{
					status: "error",
					message: error.message,
				},
				"GET",
				`${API_URL}/todos/${todoId}`,
			);
		}
	}
});

// Create todo using fetch
$("#fetch-create-todo").addEventListener("click", async () => {
	const title = getValue("#fetch-todo-title");
	const userId = getValue("#fetch-todo-user");

	if (!title) {
		outputResponse({
			status: "error",
			message: "Please enter a title",
		});
		return;
	}

	if (!userId) {
		outputResponse({
			status: "error",
			message: "Please select a user",
		});
		return;
	}

	const newTodo = {
		title,
		userId: Number.parseInt(userId, 10),
	};

	try {
		const response = await fetch(`${API_URL}/todos`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTodo),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		outputResponse(data, "POST", `${API_URL}/todos`);

		// Clear input fields after successful creation
		(document.querySelector("#fetch-todo-title") as HTMLInputElement).value =
			"";
		(document.querySelector("#fetch-todo-user") as HTMLSelectElement).value =
			"";
	} catch (error) {
		if (error instanceof Error) {
			outputResponse(
				{
					status: "error",
					message: error.message,
				},
				"POST",
				`${API_URL}/todos`,
			);
		}
	}
});

// Update todo using fetch
$("#fetch-update-todo").addEventListener("click", async () => {
	const todoId = getValue("#fetch-update-todo-id");
	const title = getValue("#fetch-update-todo-title");
	const completed = isChecked("#fetch-update-todo-completed");

	if (!todoId) {
		outputResponse({
			status: "error",
			message: "Please enter a todo ID",
		});
		return;
	}

	// Only include fields that have values
	const updatedTodo: Partial<Todo> = {};
	if (title) updatedTodo.title = title;
	updatedTodo.completed = completed;

	try {
		const response = await fetch(`${API_URL}/todos/${todoId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTodo),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		outputResponse(data, "PUT", `${API_URL}/todos/${todoId}`);

		// Clear input fields after successful update
		(
			document.querySelector("#fetch-update-todo-title") as HTMLInputElement
		).value = "";
		(
			document.querySelector("#fetch-update-todo-completed") as HTMLInputElement
		).checked = false;
	} catch (error) {
		if (error instanceof Error) {
			outputResponse(
				{
					status: "error",
					message: error.message,
				},
				"PUT",
				`${API_URL}/todos/${todoId}`,
			);
		}
	}
});

// Delete todo using fetch
$("#fetch-delete-todo").addEventListener("click", async () => {
	const todoId = getValue("#fetch-delete-todo-id");

	if (!todoId) {
		outputResponse({
			status: "error",
			message: "Please enter a todo ID",
		});
		return;
	}

	try {
		const response = await fetch(`${API_URL}/todos/${todoId}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		outputResponse(data, "DELETE", `${API_URL}/todos/${todoId}`);
	} catch (error) {
		if (error instanceof Error) {
			outputResponse(
				{
					status: "error",
					message: error.message,
				},
				"DELETE",
				`${API_URL}/todos/${todoId}`,
			);
		}
	}
});

// Timeout example with fetch
$("#fetch-timeout").addEventListener("click", async () => {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 1000);

		const response = await fetch(`${API_URL}/todos`, {
			signal: controller.signal,
		});

		// Clear the timeout since the request completed
		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		outputResponse(data, "GET", `${API_URL}/todos (with timeout)`);
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === "AbortError") {
				outputResponse(
					{
						status: "error",
						message: "Request timed out after 1 second",
					},
					"GET",
					`${API_URL}/todos (with timeout)`,
				);
			} else {
				outputResponse(
					{
						status: "error",
						message: error.message,
					},
					"GET",
					`${API_URL}/todos (with timeout)`,
				);
			}
		}
	}
});

// Start long request for abort example
$("#fetch-start-request").addEventListener("click", async () => {
	// Abort any existing request
	if (currentController) {
		currentController.abort();
		currentController = null;
	}

	currentController = new AbortController();

	outputResponse(
		"Request started... (This simulates a long-running request)",
		"GET",
		`${API_URL}/todos?delay=5000`,
	);

	try {
		const response = await fetch(`${API_URL}/todos?delay=5000`, {
			signal: currentController.signal,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		outputResponse(data, "GET", `${API_URL}/todos?delay=5000`);
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === "AbortError") {
				outputResponse(
					{
						status: "info",
						message: "Request was aborted",
					},
					"GET",
					`${API_URL}/todos?delay=5000 (ABORTED)`,
				);
			} else {
				outputResponse(
					{
						status: "error",
						message: error.message,
					},
					"GET",
					`${API_URL}/todos?delay=5000`,
				);
			}
		}
	} finally {
		currentController = null;
	}
});

// Abort request
$("#fetch-abort-request").addEventListener("click", () => {
	if (currentController) {
		currentController.abort();
		currentController = null;
	} else {
		outputResponse({
			status: "info",
			message: "No active request to abort",
		});
	}
});
