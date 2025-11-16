import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ValidationError } from "sequelize";

import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";
import connectDatabase from "./db/connectDatabase.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.status = 400;
  }
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

try {
  await connectDatabase();
} catch (error) {
  console.error(error);
  process.exit(1);
}

const port = Number(process.env.PORT) | 3000;

app.listen(port, () => {
  console.log("Server is running. Use our API on port: " + port);
});
