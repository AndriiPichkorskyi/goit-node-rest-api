import multer from "multer";
import { TEMP_DIR } from "../constants/folders.js";
import HttpError from "../helpers/HttpError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR);
  },
  filename: (req, file, cb) => {
    const uniquePrefix =
      req.user.email.split("@")[0] +
      "_" +
      Date.now() +
      "_" +
      Math.round(Math.random() * 100).toString(16) +
      "_";
    cb(null, uniquePrefix + file.originalname);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage,
  limits,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(HttpError(400, "File must have mimetype 'image/...'"));
  },
});

export default upload;
