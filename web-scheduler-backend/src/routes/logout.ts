import express from "express";
import logger from "../utils/logger";

import { Response } from "express";
import { Request } from "../@types/global";

const logoutRouter = express.Router();

logoutRouter.post("/", (req: Request, res: Response) => {
  req.session.user = null;
  req.session.save((error) => {
    if (error) {
      logger.error(error);
      throw new Error("failed to terminate the session");
    }
    req.session.regenerate((error) => {
      if (error) {
        logger.error(error);
        throw new Error("failed to regenerate the terminated session");
      }
      res.status(200);
    });
  });
});

export default logoutRouter;
