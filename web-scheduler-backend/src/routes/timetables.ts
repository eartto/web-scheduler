import express from "express";
import { Response } from "express";
import { JwtPayload, Request } from "../@types/global";
import keygen from "../utils/keygen";
import tokenExtractor from "../utils/tokenExtractor";
import logger from "../utils/logger";

const timetables: Array<object> = [];

const timetablesRouter = express.Router();

timetablesRouter.get("/", (_req: Request, res: Response) => {
  res.json(timetables);
});

timetablesRouter.post(
  "/",
  tokenExtractor,
  async (req: Request, res: Response) => {
    // IMPLEMENT n IN THE KEYGEN WHEN DB IS IMPLEMENTED
    try {
      const rawToken = req.get("authorization")!.substring(7);
      if (req.decodedToken) {
        const requestToken = <JwtPayload>req.decodedToken;
        console.log(requestToken!);
        console.log(rawToken);

        const key = keygen.generateKey();
        const timetable = { ...req.body, key };
        console.log(timetable);
        timetables.push(timetable);
        res.json(timetable).status(201);
      } else {
        res.status(401);
      }
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error);
        res.status(400);
      }
    }
  },
);

export default timetablesRouter;
