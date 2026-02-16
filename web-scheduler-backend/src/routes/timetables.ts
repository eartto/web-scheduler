import express from "express";
import { Request, Response } from "express";

const timetables: Array<object> = [];

const timetablesRouter = express.Router();

timetablesRouter.get("/", (_req: Request, res: Response) => {
  res.json(timetables);
});

timetablesRouter.post("/", (req: Request, res: Response) => {
  const timetable = req.body;
  timetables.push(timetable)
  res.json(timetable);
});

export default timetablesRouter;
