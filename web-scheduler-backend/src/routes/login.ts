import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import { Request, Response } from "express";
import { JWT_SECRET } from "../utils/config";
import logger from "../utils/logger";
import User from "../models/user";

const loginRouter = express.Router();

loginRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = await User.findOne({
      where: {
        email: body.email,
      },
    });

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(req.body.password, user.dataValues.passwordHash);

    if (!user || !passwordCorrect) {
      res.status(401).json({
        error: "invalid email or password",
      });
    } else {
      const userToken = {
        email: body.email,
      };
      const token = jwt.sign(userToken, JWT_SECRET!);
      res.status(200).send({ token, email: body.email });
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
      res.status(400);
    }
  }
});

export default loginRouter;
