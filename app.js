import express from "express";
import morgan from "morgan";
import cors from "cors";
import { styleText } from "node:util";

import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";
import connectDatabase from "./db/connectDatabase.js";
import authRouter from "./routes/authRouter.js";

import notFoundHander from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(notFoundHander);
app.use(errorHandler);

try {
  await connectDatabase();
} catch (error) {
  console.error(error);
  process.exit(1);
}

const port = Number(process.env.PORT) | 3000;

app.listen(port, () => {
  console.log(
    styleText(["bgMagenta"], "Server is running.") +
      styleText(["bgMagenta"], " Use our API on port: ") +
      styleText(["green", "bgMagenta"], String(port))
  );
});
