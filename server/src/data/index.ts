import type { Todo, User } from "../models/types";

// Sample users data
export const users: User[] = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		username: "johndoe",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		username: "janesmith",
	},
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob@example.com",
		username: "bobjohnson",
	},
];

// Sample todos data
export const todos: Todo[] = [
	{
		id: 1,
		title: "Learn HTTP basics",
		completed: false,
		userId: 1,
	},
	{
		id: 2,
		title: "Master fetch API",
		completed: false,
		userId: 1,
	},
	{
		id: 3,
		title: "Build a custom HTTP client",
		completed: false,
		userId: 2,
	},
	{
		id: 4,
		title: "Implement caching",
		completed: false,
		userId: 2,
	},
	{
		id: 5,
		title: "Learn about React Query",
		completed: false,
		userId: 3,
	},
];
