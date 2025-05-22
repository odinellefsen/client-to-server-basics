import "./xhr";
import "./fetch";

// Types
import type { Todo, User } from "./types";

// API Base URL
export const API_URL = "http://localhost:3001/api";

// Helper for selecting DOM elements
export function $(selector: string): HTMLElement {
	const element = document.querySelector(selector);
	if (!element) throw new Error(`Element not found: ${selector}`);
	return element as HTMLElement;
}

// Helper for working with form inputs
export function getValue(selector: string): string {
	const element = document.querySelector(selector) as
		| HTMLInputElement
		| HTMLSelectElement;
	if (!element) throw new Error(`Input element not found: ${selector}`);
	return element.value;
}

// Helper for working with checkboxes
export function isChecked(selector: string): boolean {
	const element = document.querySelector(selector) as HTMLInputElement;
	if (!element) throw new Error(`Checkbox element not found: ${selector}`);
	return element.checked;
}

// Output response to the console-like output area
export function outputResponse(
	response: unknown,
	method = "GET",
	url = "",
): void {
	const output = $("#output");

	let outputText = "";

	if (method && url) {
		outputText += `// ${method} ${url}\n\n`;
	}

	if (typeof response === "object") {
		outputText += JSON.stringify(response, null, 2);
	} else {
		outputText += response;
	}

	output.textContent = outputText;
}

// Load users into dropdown selects
export async function loadUsers(): Promise<void> {
	try {
		const response = await fetch(`${API_URL}/users`);
		const data = await response.json();

		if (data.status === "success") {
			const users = data.data as User[];

			const xhrSelect = $("select#xhr-todo-user") as HTMLSelectElement;
			const fetchSelect = $("select#fetch-todo-user") as HTMLSelectElement;

			// Clear existing options except the first one
			xhrSelect.innerHTML = '<option value="">Select a user</option>';
			fetchSelect.innerHTML = '<option value="">Select a user</option>';

			// Add user options to both selects
			for (const user of users) {
				const xhrOption = document.createElement("option");
				xhrOption.value = user.id.toString();
				xhrOption.textContent = user.name;
				xhrSelect.appendChild(xhrOption);

				const fetchOption = document.createElement("option");
				fetchOption.value = user.id.toString();
				fetchOption.textContent = user.name;
				fetchSelect.appendChild(fetchOption);
			}
			)
		}
	} catch (error) {
		console.error("Error loading users:", error);
		outputResponse({
			status: "error",
			message: "Failed to load users. Is the server running?",
		});
	}
}

// Tab switching functionality
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		// Remove active class from all tabs
		tabs.forEach((t) => t.classList.remove("active"));

		// Add active class to clicked tab
		tab.classList.add("active");

		// Hide all tab content
		const tabContents = document.querySelectorAll(".tab-content");
		tabContents.forEach((content) => {
			content.classList.remove("active");
		});

		// Show the selected tab content
		const tabName = (tab as HTMLElement).dataset.tab;
		if (tabName) {
			const activeContent = document.getElementById(`${tabName}-content`);
			activeContent?.classList.add("active");
		}
	});
});

// Clear output button
$("#clear-output").addEventListener("click", () => {
	$("#output").textContent = "";
});

// Load users when the page loads
document.addEventListener("DOMContentLoaded", () => {
	loadUsers();
});
