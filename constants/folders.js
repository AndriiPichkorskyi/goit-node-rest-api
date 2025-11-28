import path from "node:path";

export const PUBLIC_PATH = path.join(process.cwd(), "public");
export const TEMP_DIR = path.join(process.cwd(), "temp");
export const STORAGE_AVATARS = path.join(PUBLIC_PATH, "avatars");
