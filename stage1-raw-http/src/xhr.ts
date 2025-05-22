import { $, API_URL, getValue, isChecked, outputResponse } from "./index";
import type { Todo } from "./types";

// Store the current XHR for abort functionality
let currentXHR: XMLHttpRequest | null = null;

// Get all todos using XMLHttpRequest
$("#xhr-get-todos").addEventListener("click", () => {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", `${API_URL}/todos`);

	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			const response = JSON.parse(xhr.responseText);
			outputResponse(response, "GET", `${API_URL}/todos`);
		} else {
			outputResponse(
				{
					status: "error",
					message: `Request failed with status ${xhr.status}`,
					response: xhr.responseText,
				},
				"GET",
				`${API_URL}/todos`,
			);
		}
	};

	xhr.onerror = () => {
		outputResponse(
			{
				status: "error",
				message: "Network error occurred",
			},
			"GET",
			`${API_URL}/todos`,
		);
	};

	xhr.send();
});

// Get todo by ID using XMLHttpRequest
$("#xhr-get-todo-by-id").addEventListener("click", () => {
	const todoId = getValue("#xhr-todo-id");

	if (!todoId) {
		outputResponse({
			status: "error",
			message: "Please enter a todo ID",
		});
		return;
	}

	const xhr = new XMLHttpRequest();
	xhr.open("GET", `${API_URL}/todos/${todoId}`);

	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			const response = JSON.parse(xhr.responseText);
			outputResponse(response, "GET", `${API_URL}/todos/${todoId}`);
		} else {
			outputResponse(
				{
					status: "error",
					message: `Request failed with status ${xhr.status}`,
					response: xhr.responseText,
				},
				"GET",
				`${API_URL}/todos/${todoId}`,
			);
		}
	};

	xhr.onerror = () => {
		outputResponse(
			{
				status: "error",
				message: "Network error occurred",
			},
			"GET",
			`${API_URL}/todos/${todoId}`,
		);
	};

	xhr.send();
});

// Create todo using XMLHttpRequest
$("#xhr-create-todo").addEventListener("click", () => {
	const title = getValue("#xhr-todo-title");
	const userId = getValue("#xhr-todo-user");

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

	const xhr = new XMLHttpRequest();
	xhr.open("POST", `${API_URL}/todos`);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			const response = JSON.parse(xhr.responseText);
			outputResponse(response, "POST", `${API_URL}/todos`);

			// Clear input fields after successful creation
			(document.querySelector("#xhr-todo-title") as HTMLInputElement).value =
				"";
			(document.querySelector("#xhr-todo-user") as HTMLSelectElement).value =
				"";
		} else {
			outputResponse(
				{
					status: "error",
					message: `Request failed with status ${xhr.status}`,
					response: xhr.responseText,
				},
				"POST",
				`${API_URL}/todos`,
			);
		}
	};

	xhr.onerror = () => {
		outputResponse(
			{
				status: "error",
				message: "Network error occurred",
			},
			"POST",
			`${API_URL}/todos`,
		);
	};

	xhr.send(JSON.stringify(newTodo));
});

// Update todo using XMLHttpRequest
$("#xhr-update-todo").addEventListener("click", () => {
	const todoId = getValue("#xhr-update-todo-id");
	const title = getValue("#xhr-update-todo-title");
	const completed = isChecked("#xhr-update-todo-completed");

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

	const xhr = new XMLHttpRequest();
	xhr.open("PUT", `${API_URL}/todos/${todoId}`);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			const response = JSON.parse(xhr.responseText);
			outputResponse(response, "PUT", `${API_URL}/todos/${todoId}`);

			// Clear input fields after successful update
			(
				document.querySelector("#xhr-update-todo-title") as HTMLInputElement
			).value = "";
			(
				document.querySelector("#xhr-update-todo-completed") as HTMLInputElement
			).checked = false;
		} else {
			outputResponse(
				{
					status: "error",
					message: `Request failed with status ${xhr.status}`,
					response: xhr.responseText,
				},
				"PUT",
				`${API_URL}/todos/${todoId}`,
			);
		}
	};

	xhr.onerror = () => {
		outputResponse(
			{
				status: "error",
				message: "Network error occurred",
			},
			"PUT",
			`${API_URL}/todos/${todoId}`,
		);
	};

	xhr.send(JSON.stringify(updatedTodo));
});

// Delete todo using XMLHttpRequest
$("#xhr-delete-todo").addEventListener("click", () => {
	const todoId = getValue("#xhr-delete-todo-id");

	if (!todoId) {
		outputResponse({
			status: "error",
			message: "Please enter a todo ID",
		});
		return;
	}

	const xhr = new XMLHttpRequest();
	xhr.open("DELETE", `${API_URL}/todos/${todoId}`);

	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			const response = JSON.parse(xhr.responseText);
			outputResponse(response, "DELETE", `${API_URL}/todos/${todoId}`);
		} else {
			outputResponse(
				{
					status: "error",
					message: `Request failed with status ${xhr.status}`,
					response: xhr.responseText,
				},
				"DELETE",
				`${API_URL}/todos/${todoId}`,
			);
		}
	};

	xhr.onerror = () => {
		outputResponse(
			{
				status: "error",
				message: "Network error occurred",
			},
			"DELETE",
			`${API_URL}/todos/${todoId}`,
		);
	};

	xhr.send();
});

// Timeout example
$("#xhr-timeout").addEventListener("click", () => {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", `${API_URL}/todos`);

	// Set timeout to 1 second
	xhr.timeout = 1000;

	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			const response = JSON.parse(xhr.responseText);
			outputResponse(response, "GET", `${API_URL}/todos (with timeout)`);
		} else {
			outputResponse(
				{
					status: "error",
					message: `Request failed with status ${xhr.status}`,
					response: xhr.responseText,
				},
				"GET",
				`${API_URL}/todos (with timeout)`,
			);
		}
	};

	xhr.ontimeout = () => {
		outputResponse(
			{
				status: "error",
				message: "Request timed out after 1 second",
			},
			"GET",
			`${API_URL}/todos (with timeout)`,
		);
	};

	xhr.onerror = () => {
		outputResponse(
			{
				status: "error",
				message: "Network error occurred",
			},
			"GET",
			`${API_URL}/todos (with timeout)`,
		);
	};

	xhr.send();
});

// Start long request for abort example
$("#xhr-start-request").addEventListener("click", () => {
	// Abort any existing request
	if (currentXHR) {
		currentXHR.abort();
	}

	currentXHR = new XMLHttpRequest();
	currentXHR.open("GET", `${API_URL}/todos?delay=5000`);

	outputResponse(
		"Request started... (This simulates a long-running request)",
		"GET",
		`${API_URL}/todos?delay=5000`,
	);

	currentXHR.onload = () => {
		if (currentXHR && currentXHR.status >= 200 && currentXHR.status < 300) {
			const response = JSON.parse(currentXHR.responseText);
			outputResponse(response, "GET", `${API_URL}/todos?delay=5000`);
		} else if (currentXHR) {
			outputResponse(
				{
					status: "error",
					message: `Request failed with status ${currentXHR.status}`,
					response: currentXHR.responseText,
				},
				"GET",
				`${API_URL}/todos?delay=5000`,
			);
		}

		currentXHR = null;
	};

	currentXHR.onerror = () => {
		outputResponse(
			{
				status: "error",
				message: "Network error occurred",
			},
			"GET",
			`${API_URL}/todos?delay=5000`,
		);

		currentXHR = null;
	};

	currentXHR.onabort = () => {
		outputResponse(
			{
				status: "info",
				message: "Request was aborted",
			},
			"GET",
			`${API_URL}/todos?delay=5000 (ABORTED)`,
		);

		currentXHR = null;
	};

	currentXHR.send();
});

// Abort request
$("#xhr-abort-request").addEventListener("click", () => {
	if (currentXHR) {
		currentXHR.abort();
	} else {
		outputResponse({
			status: "info",
			message: "No active request to abort",
		});
	}
});
