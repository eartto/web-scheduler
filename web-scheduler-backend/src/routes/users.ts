import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

import models from "../models";
import logger from "../utils/logger";

const usersRouter = express.Router();

usersRouter.get("/", async (_req: Request, res: Response) => {
  const users = await models.User.findAll({
    include: {
      model: models.Timetable,
    },
  });
  res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const user = await models.User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
      res.status(400);
    }
  }
});

usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await models.User.create({ email, passwordHash });
    res.json(user).status(201);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
      res.status(400);
    }
  }
});

export default usersRouter;
