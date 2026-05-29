import { Request as ExpressRequest } from "express";
import { Session as ExpressSession } from "express-session";
import { CookieOptions as ExpressCookieOptions } from "express-session";

export interface Session extends ExpressSession {
  user?: User | null;
}

export interface Request extends ExpressRequest {
  session: Session;
}

export interface CookieOptions extends ExpressCookieOptions {
  secure?: boolean;
  sameSite?: boolean | "lax" | "none" | "strict";
  maxAge?: number;
}

export interface User {
  id: number;
  email: Text;
}
