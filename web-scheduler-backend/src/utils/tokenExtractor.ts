import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { Response, NextFunction, RequestHandler } from "express";
import { Request } from "../@types/global";

const tokenExtractor: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization || authorization!.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization!.substring(7), JWT_SECRET!);
    } catch {
      res.status(401).json({ error: "token invalid" });
    }
  } else {
    res.status(401).json({ error: "token missing" });
  }
  next();
};

export default tokenExtractor;
