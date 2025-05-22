import cors from "cors";
import express from "express";
import { todosRouter } from "./routes/todos";
import { usersRouter } from "./routes/users";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Status endpoint for health check
app.get("/api/status", (req, res) => {
	res.json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);

// Error handling middleware
app.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		console.error(err.stack);
		res.status(500).json({
			status: "error",
			message: "Something went wrong!",
			error: process.env.NODE_ENV === "development" ? err.message : undefined,
		});
	},
);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
