import express from "express";
import { Request, Response } from "express";
import keygen from "../utils/keygen";
import Timetable from "../models/timetable";

const timetablesRouter = express.Router();

timetablesRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const timetables = await Timetable.findAll();
    res.json(timetables);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).end();
    }
  }
});

timetablesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user = req.session.user;
    console.log(user);
    const key = await keygen.generateKey();
    const timetable = await Timetable.create({ ...req.body, key });
    res.json(timetable);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).end();
    }
  }
});

export default timetablesRouter;
