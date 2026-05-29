import bcrypt from "bcrypt";
import express from "express";
import { Request, Response } from "express";
import logger from "../utils/logger";
import User from "../models/user";

const loginRouter = express.Router();

loginRouter.get("/", async (req: Request, res: Response) => {
  try {
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      res.status(401);
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
      res.status(401);
    }
  }
});

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
      const regenerateSession = async () => {
        req.session.regenerate((error) => {
          if (error) {
            logger.error(error);
            throw new Error("failed to regenerate the session");
          }
        });

        req.session.user = {
          id: user.dataValues.id,
          email: user.dataValues.email,
        };
        req.session.save((error) => {
          if (error) {
            logger.error(error);
            throw new Error("failed to create a session");
          }
        });
        console.log("session regenerated");
      };

      await regenerateSession();
      console.log(req.session.user);
      res.status(200).send({ email: body.email });
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
      res.status(401);
    }
  }
});

export default loginRouter;
