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

import { createFolderIsNotExist } from "./helpers/createFolderIsNotExist.js";
import { PUBLIC_PATH, STORAGE_AVATARS, TEMP_DIR } from "./constants/folders.js";

const app = express(PUBLIC_PATH);

app.use(express.static(PUBLIC_PATH));

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
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
  createFolderIsNotExist(PUBLIC_PATH);
  createFolderIsNotExist(TEMP_DIR);
  createFolderIsNotExist(STORAGE_AVATARS);

  console.log(
    styleText(["bgMagenta"], "Server is running.") +
      styleText(["bgMagenta"], " Use our API on port: ") +
      styleText(["green", "bgMagenta"], String(port))
  );
  console.log(styleText(["yellow"], ">>> >>> >>> http://localhost:" + port));
});
