import jwt from "jsonwebtoken";
import config from "../utils/config";
import express from "express";
import { Request, Response } from "express";

const loginRouter = express.Router();

loginRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);

  const emailCorrect = body.email === "guest";
  const passwordCorrect = body.password === "guest1";

  if (!emailCorrect || !passwordCorrect) {
    return res.status(401).json({
      error: "invalid email or password",
    });
  }

  const userToken = {
    email: body.email,
  };

  const token = jwt.sign(userToken, config.JWT_SECRET!);
  return res.status(200).send({ token, email: body.email });
});

export default loginRouter;
