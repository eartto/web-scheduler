import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/user";
import logger from "../utils/logger";

const usersRouter = express.Router();

usersRouter.get("/", async (_req: Request, res: Response) => {
  const users = await User.findAll({});
  res.json(users);
});

usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ email, passwordHash });
    res.json(user).status(201);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
      res.status(400);
    }
  }
});

export default usersRouter;
