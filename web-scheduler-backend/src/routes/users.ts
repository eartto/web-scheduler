import express from "express";
import { Request, Response } from "express";

const usersRouter = express.Router();

const users: Array<object> = [];

usersRouter.get("/", (_req: Request, res: Response) => {
  res.json(users);
});

usersRouter.post("/", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  user.push(user);

  res.json(user);
});

export default usersRouter;
