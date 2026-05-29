import "dotenv/config";
import { CookieOptions } from "../@types/global";

export const PORT = process.env.PORT || 3000;
export const ROOTKEY = process.env.ROOTKEY;
export const ROOTID = process.env.ROOTID;
export const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = Number(process.env.DATABASE_PORT);

export const CookieConfig: CookieOptions =
  process.env.NODE_ENV === "development"
    ? {
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 60 * 24 * 2,
      }
    : {
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 60 * 24 * 2,
      };
