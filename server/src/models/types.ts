export interface Todo {
	id: number;
	title: string;
	completed: boolean;
	userId: number;
}

export interface User {
	id: number;
	name: string;
	email: string;
	username: string;
}

export interface ErrorResponse {
	status: "error";
	message: string;
	error?: string;
}

export interface SuccessResponse<T> {
	status: "success";
	data: T;
}
