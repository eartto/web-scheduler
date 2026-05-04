import "dotenv/config";

export const PORT = process.env.PORT || 3000;
export const ROOTKEY = process.env.ROOTKEY;
export const ROOTID = process.env.ROOTID;
export const JWT_SECRET = process.env.JWT_SECRET;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = Number(process.env.DATABASE_PORT);
