import { Request as ExpressRequest } from "express";
import { JwtPayload as JsonWebTokenPayload } from "jsonwebtoken";

export interface JwtPayload extends JsonWebTokenPayload {
  email?: string;
}
export interface Request extends ExpressRequest {
  decodedToken?: string | JwtPayload;
}
